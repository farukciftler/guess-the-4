import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  fallbackLng: 'en',
  resources: {
    en: {
      translation: {
        "gameTitle": "Number Guessing Game",
        "howToPlay": "How to Play",
        "playVsComputer": "Play vs Computer",
        "createRoom": "Create Multiplayer Room",
        "joinRoom": "Join Room",
        "yourName": "Your Name",
        "enterName": "Enter your name",
        "timePerPlayer": "Time per Player",
        "minutes": "minutes",
        "roomId": "Room ID",
        "player": "Player",
        "mode": "Mode",
        "vsComputer": "vs Computer",
        "multiplayer": "Multiplayer",
        "waitingForPlayer": "Waiting for player...",
        "computer": "Computer",
        "opponent": "Opponent",
        "gameSetup": "Game Setup",
        "makingGuesses": "Making Guesses",
        "feedbackColors": "Feedback Colors",
        "example": "Example",
        "winning": "Winning",
        "copyRoomId": "Copy Room ID",
        "backToMenu": "Back to Menu",
        "invalidNumber": "Invalid number",
        "enterValidNumber": "Please enter a 4-digit number with unique digits",
        "gameSummary": "Game Summary",
        "won": "Won!",
        "time": "Time",
        "secret": "Secret",
        "yourGuesses": "Your Guesses",
        "opponentGuesses": "Opponent's Guesses",
        "gameDuration": "Game Duration",
        "winningTurn": "Winning Turn",
        "turn": "Turn",
      }
    },
    tr: {
      translation: {
        "gameTitle": "Sayı Tahmin Oyunu",
        "howToPlay": "Nasıl Oynanır",
        "playVsComputer": "Bilgisayara Karşı Oyna",
        "createRoom": "Çok Oyunculu Oda Oluştur",
        "joinRoom": "Odaya Katıl",
        "yourName": "Adınız",
        "enterName": "Adınızı girin",
        "timePerPlayer": "Oyuncu Başına Süre",
        "minutes": "dakika",
        "roomId": "Oda ID",
        "player": "Oyuncu",
        "mode": "Mod",
        "vsComputer": "Bilgisayara Karşı",
        "multiplayer": "Çok Oyunculu",
        "waitingForPlayer": "Oyuncu bekleniyor...",
        "computer": "Bilgisayar",
        "opponent": "Rakip",
        "gameSetup": "Oyun Kurulumu",
        "makingGuesses": "Tahmin Yapma",
        "feedbackColors": "Geribildirim Renkleri",
        "example": "Örnek",
        "winning": "Kazanma",
        "copyRoomId": "Oda ID'sini Kopyala",
        "backToMenu": "Menüye Dön",
        "invalidNumber": "Geçersiz sayı",
        "enterValidNumber": "Lütfen benzersiz rakamlardan oluşan 4 basamaklı bir sayı girin",
        "gameSummary": "Oyun Özeti",
        "won": "Kazandı!",
        "time": "Süre",
        "secret": "Gizli Sayı",
        "yourGuesses": "Tahminleriniz",
        "opponentGuesses": "Rakip Tahminleri",
        "gameDuration": "Oyun Süresi",
        "winningTurn": "Kazanan Tur",
        "turn": "Tur",
      }
    }
  },
  interpolation: {
    escapeValue: false
  }
});

export default i18n;