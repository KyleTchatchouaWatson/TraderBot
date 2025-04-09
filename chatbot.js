document.addEventListener('DOMContentLoaded', function () {
  const chatContent = document.getElementById('chat-content');
  const userInput = document.getElementById('user-input');
  const sendButton = document.getElementById('send-button');
  const newChatBtn = document.querySelector('.new-chat-btn');
  const sidebarToggle = document.querySelector('.sidebar-toggle');
  const sidebar = document.querySelector('.sidebar');
  const suggestionCards = document.querySelectorAll('.suggestion-card');

  userInput.addEventListener('input', function () {
    this.style.height = 'auto';
    this.style.height = this.scrollHeight + 'px';
    sendButton.disabled = this.value.trim() === '';
  });

  sendButton.addEventListener('click', sendMessage);

  userInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });

  newChatBtn.addEventListener('click', function () {
    alert('Starting a new chat session...');
  });

  sidebarToggle.addEventListener('click', function () {
    sidebar.classList.toggle('open');
  });

  suggestionCards.forEach((card) => {
    card.addEventListener('click', function () {
      const text = this.querySelector('span').textContent;
      userInput.value = text;
      userInput.focus();
      userInput.dispatchEvent(new Event('input'));
    });
  });

  function sendMessage() {
    const message = userInput.value.trim();
    if (message === '') return;

    addMessage(message, 'user');

    userInput.value = '';
    userInput.style.height = 'auto';
    sendButton.disabled = true;

    setTimeout(() => {
      const botResponse = generateBotResponse(message);
      addMessage(botResponse, 'bot');
    }, 1000);
  }

  function addMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${sender}-message`;

    const time = new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });

    if (sender === 'user') {
      messageDiv.innerHTML = `
        <div class="message-content">
          <div class="message-text">${text}</div>
          <div class="message-time">${time}</div>
        </div>
        <div class="user-avatar">U</div>
      `;
    } else {
      messageDiv.innerHTML = `
        <div class="bot-avatar">P</div>
        <div class="message-content">
          <div class="message-text">${text}</div>
          <div class="message-time">${time}</div>
        </div>
      `;
    }

    chatContent.appendChild(messageDiv);
    chatContent.scrollTop = chatContent.scrollHeight;
  }

  function generateBotResponse(userMessage) {
    const knowledgeBase = {
      "hello": ["Hello! How can I assist you with your trading today?", "Hi there! What trading questions can I help you with?"],
      "hi": ["Hi there! What trading questions can I help you with?", "Hello! How can I assist you with your trading today?"],
      "what's the best trading strategy for beginners": [
        "For beginners, I recommend starting with trend following and support/resistance strategies. Would you like me to explain these in detail?",
        "Consider starting with simple strategies like moving averages and MACD before diving into more complex ones."
      ],
      "explain rsi indicator": [
        "The RSI (Relative Strength Index) is a momentum oscillator that measures the speed and change of price movements. It ranges from 0 to 100 and is typically used to identify overbought (>70) or oversold (<30) conditions.",
        "RSI helps traders understand when an asset might be overvalued or undervalued."
      ],
      "best crypto trading strategy": [
        "For crypto trading, consider these strategies:\n1. Dollar-cost averaging (DCA)\n2. Swing trading using support/resistance\n3. Breakout trading with volume confirmation\nWould you like details on any of these?",
        "Crypto trading can be highly volatile, so it's important to use risk management techniques."
      ],
      "how to calculate position size": [
        "Position size can be calculated using:\n\nPosition Size = (Account Risk %) / (Stop Loss Distance)\n\nFor example, if you risk 1% of a $10,000 account ($100) with a 5% stop loss, your position would be $100 / 0.05 = $2,000.",
        "Diversifying positions can help manage risk."
      ],
      "market outlook for next week": [
        "Based on current technical indicators, we're seeing:\n- S&P 500 testing resistance at 4,200\n- Bitcoin consolidating around $30,000\n- Gold showing strength above $1,950\n\nWould you like a detailed analysis for any specific market?",
        "Stay updated with real-time data and news for the most accurate outlook."
      ],
      "how often should you trade?": [
        "Based on my knowledge, trading 1 to 3 times a day is considered reasonable. However, frequency can vary depending on your strategy and risk tolerance."
      ],
      "what's the best session to trade in?": [
        "Based on my knowledge, the New york session is the best session to trade as the markets are quite volatile and can be a good session for people who trade pairs like us30, Nasdaq and Gold(xau/usd)."
      ],
      "what's the best indicator for trend following?": [
        "RSI (Relative Strength Index) is a popular momentum oscillator that traders use to identify overbought or oversold conditions. It helps in determining whether a currency pair is trending or not."
      ],
      "what tools do traders use?": [
        "Traders commonly use technical analysis tools such as moving averages, pivot points, and Fibonacci retracement levels. These tools help in identifying support and resistance levels and predicting potential price movements."
      ],
      "what's the best time frame for day trading?": [
        "For day trading, traders often use the 1-hour or 5-minute time frames to identify short-term trends and setups. This allows them to capitalize on intraday volatility."
      ],
      "what's a moving average used for in forex?": [
        "A moving average is used to smooth out price data to create a clearer trend-following signal. Traders use it to determine the direction of the trend and identify potential entry and exit points."
      ],
      "what's an important economic indicator?": [
        "The Non-Farm Payroll (NFP) report is one of the most important economic indicators in forex trading. It provides insights into the health of the U.S. economy, which can significantly impact currency pairs like USD/JPY and EUR/USD."
      ],
      "what's the importance of fibonacci retracement levels?": [
        "Fibonacci retracement levels are key tools used by traders to identify potential support and resistance levels. These levels help in predicting where price might find balance after a strong move."
      ],
      "what's a stop-loss order for risk management?": [
        "A stop-loss order is essential for managing risk in forex trading. It automatically closes a position if the market moves against the trader, preventing further losses beyond a predetermined level."
      ],
      "what's the significance of support and resistance levels?": [
        "Support and resistance levels are critical in identifying potential price reversal points. Traders use these levels to make informed decisions about entry and exit points based on past price movements."
      ],
      "what's the best way to manage risk in forex trading?": [
        "A key strategy for managing risk in forex trading is using a combination of stop-loss orders, position sizing, and diversification. These techniques help minimize potential losses while maximizing opportunities for profit."
      ],
      
        "how to read candlestick charts": [
          "Candlestick charts display price movements using candle shapes. The body shows the open and close prices, while wicks represent the highs and lows.",
          "Understanding patterns like doji, hammer, and engulfing candles can help predict potential market reversals or continuations."
        ],
        "what is leverage in trading": [
          "Leverage allows traders to control a larger position with a smaller amount of capital. For example, 1:100 leverage means you can trade $10,000 with just $100.",
          "Be cautious—while leverage can amplify profits, it also increases the risk of losses."
        ],
        "how to avoid overtrading": [
          "Set a trading plan with clear rules and stick to it. Avoid emotional decisions and take breaks when needed.",
          "Limit your number of trades per day or week to stay disciplined and avoid burnout."
        ],
        "what is a pip in forex": [
          "A pip stands for 'percentage in point' and represents the smallest price movement in forex, usually 0.0001 for most pairs.",
          "Pips are essential in calculating profits and losses in forex trading."
        ],
        "how to trade news events": [
          "Trade news events by identifying key releases like NFP, CPI, or interest rate decisions. Use a news calendar to stay updated.",
          "News trading requires fast execution and strong risk management due to increased volatility."
        ],
        "what is a trading journal": [
          "A trading journal is a record of all your trades, including entries, exits, reasons for trading, and outcomes. It helps you evaluate and improve your performance.",
          "Keeping a journal helps you spot patterns in your strategy and correct recurring mistakes."
        ],
        "is trading forex risky": [
          "Yes, forex trading is risky due to market volatility and leverage. Always use proper risk management techniques.",
          "While forex offers profit potential, it also comes with significant risks. Never trade money you can't afford to lose."
        ],
        "what is slippage in trading": [
          "Slippage occurs when an order is executed at a different price than expected, often during high volatility.",
          "It can result in a better or worse entry/exit price, especially during major news events or low liquidity periods."
        ],
        "how to develop a trading strategy": [
          "Start by choosing a market, defining your risk tolerance, and selecting technical indicators or patterns you trust.",
          "Backtest your strategy on historical data before using it with real money."
        ],
        "what is a trading bot": [
          "A trading bot is an automated software that executes trades based on pre-set algorithms and strategies.",
          "Bots help traders execute strategies efficiently, especially in fast-moving markets like crypto."
        ]
    };
    const lowerMessage = userMessage.toLowerCase();

    for (const [key, responses] of Object.entries(knowledgeBase)) {
      if (lowerMessage.includes(key) || key === lowerMessage) {
        return getRandomResponse(responses);
      }
    }

    return "I'm Prismyte, your trading AI assistant. I can help with:\n\n- Market analysis\n- Trading strategies\n- Technical indicators\n- Risk management\n\nWhat specific trading question can I answer for you?";
  }

  function getRandomResponse(responses) {
    return responses[Math.floor(Math.random() * responses.length)];
  }
});
