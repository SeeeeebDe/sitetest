<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Gérer les requêtes OPTIONS (preflight)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Configuration
$dataFile = __DIR__ . '/satisfaction_data.json';
$maxFileSize = 10 * 1024 * 1024; // 10MB max

// Fonction pour lire les données
function readData($file) {
    if (!file_exists($file)) {
        return [];
    }
    $content = file_get_contents($file);
    return $content ? json_decode($content, true) : [];
}

// Fonction pour écrire les données
function writeData($file, $data) {
    $json = json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
    return file_put_contents($file, $json, LOCK_EX) !== false;
}

// Fonction pour obtenir l'IP du client
function getClientIP() {
    $ipKeys = ['HTTP_CF_CONNECTING_IP', 'HTTP_CLIENT_IP', 'HTTP_X_FORWARDED_FOR', 'REMOTE_ADDR'];
    foreach ($ipKeys as $key) {
        if (array_key_exists($key, $_SERVER) === true) {
            foreach (explode(',', $_SERVER[$key]) as $ip) {
                $ip = trim($ip);
                if (filter_var($ip, FILTER_VALIDATE_IP, FILTER_FLAG_NO_PRIV_RANGE | FILTER_FLAG_NO_RES_RANGE) !== false) {
                    return $ip;
                }
            }
        }
    }
    return $_SERVER['REMOTE_ADDR'] ?? 'unknown';
}

// Fonction pour vérifier la limite quotidienne par IP
function checkDailyLimit($data, $ip) {
    $today = date('Y-m-d');
    $todaySubmissions = array_filter($data, function($item) use ($ip, $today) {
        return $item['ip'] === $ip && 
               isset($item['timestamp']) && 
               date('Y-m-d', strtotime($item['timestamp'])) === $today;
    });
    return count($todaySubmissions) === 0;
}

try {
    switch ($_SERVER['REQUEST_METHOD']) {
        case 'GET':
            $action = $_GET['action'] ?? 'get_data';
            
            if ($action === 'check_limit') {
                // Vérifier la limite quotidienne sans authentification
                $clientIP = getClientIP();
                $data = readData($dataFile);
                $canSubmit = checkDailyLimit($data, $clientIP);
                echo json_encode(['canSubmit' => $canSubmit]);
                break;
            }
            
            // Récupérer les données (pour les stats et la gestion)
            $password = $_GET['password'] ?? '';
            if ($password !== 'ajGXd8MyHTSqi36') {
                http_response_code(401);
                echo json_encode(['error' => 'Accès non autorisé']);
                exit();
            }
            
            $data = readData($dataFile);
            echo json_encode($data);
            break;
            
        case 'POST':
            // Vérifier la taille du fichier
            if (file_exists($dataFile) && filesize($dataFile) > $maxFileSize) {
                http_response_code(507);
                echo json_encode(['error' => 'Stockage plein']);
                exit();
            }
            
            $input = json_decode(file_get_contents('php://input'), true);
            
            if (!$input) {
                http_response_code(400);
                echo json_encode(['error' => 'Données invalides']);
                exit();
            }
            
            // Si c'est un test de limite, on retourne juste le statut
            if (isset($input['test']) && $input['test'] === true) {
                $clientIP = getClientIP();
                $data = readData($dataFile);
                $canSubmit = checkDailyLimit($data, $clientIP);
                
                if (!$canSubmit) {
                    http_response_code(429);
                    echo json_encode(['error' => 'Limite quotidienne atteinte']);
                } else {
                    echo json_encode(['canSubmit' => true]);
                }
                exit();
            }
            
            // Validation des données requises
            $required = ['firstName', 'massageDate', 'responses'];
            foreach ($required as $field) {
                if (!isset($input[$field]) || empty($input[$field])) {
                    http_response_code(400);
                    echo json_encode(['error' => "Champ requis manquant: $field"]);
                    exit();
                }
            }
            
            // Validation des réponses
            $expectedQuestions = ['communication', 'attentes', 'massage', 'intimite', 'domicile', 'satisfaction'];
            foreach ($expectedQuestions as $question) {
                if (!isset($input['responses'][$question]) || 
                    !is_numeric($input['responses'][$question]) || 
                    $input['responses'][$question] < 1 || 
                    $input['responses'][$question] > 5) {
                    http_response_code(400);
                    echo json_encode(['error' => "Réponse invalide pour: $question"]);
                    exit();
                }
            }
            
            $clientIP = getClientIP();
            $data = readData($dataFile);
            
            // Vérifier la limite quotidienne
            if (!checkDailyLimit($data, $clientIP)) {
                http_response_code(429);
                echo json_encode(['error' => 'Vous avez déjà répondu aujourd\'hui']);
                exit();
            }
            
            // Préparer les données à sauvegarder
            $surveyData = [
                'id' => uniqid('survey_', true),
                'firstName' => trim($input['firstName']),
                'massageDate' => $input['massageDate'],
                'responses' => $input['responses'],
                'feedback' => trim($input['feedback'] ?? ''),
                'timestamp' => date('c'), // ISO 8601
                'ip' => $clientIP
            ];
            
            // Ajouter aux données existantes
            $data[] = $surveyData;
            
            // Sauvegarder
            if (writeData($dataFile, $data)) {
                echo json_encode(['success' => true, 'message' => 'Réponse enregistrée']);
            } else {
                http_response_code(500);
                echo json_encode(['error' => 'Erreur de sauvegarde']);
            }
            break;
            
        case 'DELETE':
            // Supprimer des réponses (pour la gestion)
            $password = $_GET['password'] ?? '';
            if ($password !== 'ajGXd8MyHTSqi36') {
                http_response_code(401);
                echo json_encode(['error' => 'Accès non autorisé']);
                exit();
            }
            
            $input = json_decode(file_get_contents('php://input'), true);
            $idsToDelete = $input['ids'] ?? [];
            
            if (empty($idsToDelete)) {
                http_response_code(400);
                echo json_encode(['error' => 'Aucun ID fourni']);
                exit();
            }
            
            $data = readData($dataFile);
            $filteredData = array_filter($data, function($item) use ($idsToDelete) {
                return !in_array($item['id'], $idsToDelete);
            });
            
            if (writeData($dataFile, array_values($filteredData))) {
                echo json_encode(['success' => true, 'message' => 'Réponses supprimées']);
            } else {
                http_response_code(500);
                echo json_encode(['error' => 'Erreur de suppression']);
            }
            break;
            
        default:
            http_response_code(405);
            echo json_encode(['error' => 'Méthode non autorisée']);
            break;
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Erreur serveur: ' . $e->getMessage()]);
}
?>