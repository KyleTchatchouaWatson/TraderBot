    function saveChat(message, role) {
    let chats = JSON.parse(localStorage.getItem("currentChat")) || [];
    chats.push({ role, message, timestamp: Date.now() });
    localStorage.setItem("currentChat", JSON.stringify(chats));
  }
  function saveToChatHistory() {
    let currentChat = JSON.parse(localStorage.getItem("currentChat")) || [];
    let chatHistory = JSON.parse(localStorage.getItem("chatHistory")) || [];
    if (currentChat.length > 0) {
      chatHistory.push({ chat: currentChat, timestamp: Date.now() });
      localStorage.setItem("chatHistory", JSON.stringify(chatHistory));
    }
    localStorage.setItem("currentChat", JSON.stringify([]));
  }
  function loadChatHistory(callback) {
    let chatHistory = JSON.parse(localStorage.getItem("chatHistory")) || [];
    if (callback && typeof callback === "function") {
      chatHistory.forEach(chatSession => {
        chatSession.chat.forEach(chat => {
          callback(chat.message, chat.role);
        });
      });
    }
  }
  function clearChatHistory() {
    localStorage.removeItem("chatHistory");
  }
