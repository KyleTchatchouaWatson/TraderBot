document.addEventListener('DOMContentLoaded', function () {
  const savedTheme = localStorage.getItem('prismyteTheme') || 'default';
  document.body.classList.add(`theme-${savedTheme}`);
});
window.addEventListener("DOMContentLoaded", () => {
  loadChatHistory(displayChat);
});

function handleSendMessage() {
  const input = document.getElementById("userInput").value.trim();
  if (!input) return;

  displayChat(input, "user");
  saveChat(input, "user");

  const botResponse = generateBotResponse(input);
  displayChat(botResponse, "bot");
  saveChat(botResponse, "bot");

  document.getElementById("userInput").value = "";
}
window.addEventListener("DOMContentLoaded", () => {
  loadChatHistory(displayChat);
});

function displayChat(message, role) {
  const chatContainer = document.getElementById("chatContainer");

  const messageElement = document.createElement("div");
  messageElement.classList.add(role); 
  messageElement.textContent = message;

  chatContainer.appendChild(messageElement);
}
function handleSendMessage() {
  const input = document.getElementById("userInput").value.trim();
  if (!input) return;
  displayChat(input, "user");
  saveChat(input, "user");
  const botResponse = generateBotResponse(input);
  displayChat(botResponse, "bot");
  saveChat(botResponse, "bot");
  document.getElementById("userInput").value = "";
}
function handleNewChat() {
  saveToChatHistory();
  const chatContainer = document.getElementById("chatContainer");
  chatContainer.innerHTML = ""; 
  document.getElementById("userInput").focus();
}
document.addEventListener('DOMContentLoaded', function () {
  const chatContent = document.getElementById('chat-content');
  const userInput = document.getElementById('user-input');
  const sendButton = document.getElementById('send-button');
  const newChatBtn = document.querySelector('.new-chat-btn');
  const sidebarToggle = document.querySelector('.sidebar-toggle');
  const sidebar = document.querySelector('.sidebar');
  const suggestionCards = document.querySelectorAll('.suggestion-card');
  const settingsBtn = document.getElementById("settingsBtn");
  const settingsPopup = document.getElementById("settingsPopup");
  settingsBtn.addEventListener("click", () => {
  settingsPopup.classList.toggle("hidden");
});
window.addEventListener("click", (e) => {
  if (!settingsPopup.contains(e.target) && !settingsBtn.contains(e.target)) {
    settingsPopup.classList.add("hidden");
  }
});
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
    const normalizedMessage=userMessage.toLowerCase().replace("/[^\w\s]/gi,");
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
          ],
          "what is market liquidity": [
            "Liquidity refers to how easily an asset can be bought or sold without affecting its price. Forex majors have high liquidity.",
            "Low liquidity assets (like small-cap stocks) may have wider bid-ask spreads."
          ],
          "how to use moving averages": [
            "Moving averages smooth price data to identify trends. The 50-day and 200-day MAs are commonly watched levels.",
            "Golden cross (50MA crosses above 200MA) and death cross (opposite) signal potential trend changes."
          ],
          "what is bitcoin halving": [
            "Bitcoin halving occurs every 210,000 blocks (≈4 years) when mining rewards are cut in half to control inflation.",
            "Historically, halvings have preceded major BTC price rallies due to reduced supply pressure."
          ],
          "how to identify support and resistance": [
            "Support is where buying interest may emerge (price floor), resistance is where selling may occur (price ceiling).",
            "These levels can be identified using previous highs/lows, moving averages, or Fibonacci retracements."
          ],
          "what is dollar cost averaging": [
            "DCA involves investing fixed amounts at regular intervals regardless of price, reducing volatility impact.",
            "Popular in crypto for accumulating assets long-term without trying to time the market."
          ],
          "how to read order flow": [
            "Order flow analysis tracks the volume and direction of trades to gauge buying/selling pressure.",
            "Tools like footprint charts or time & sales data help professional traders read order flow."
          ],
          "what is a stop-loss order": [
            "A stop-loss automatically closes a position at a predetermined price to limit losses.",
            "Essential for risk management - should be placed based on technical levels, not arbitrary percentages."
          ],
          "how to use RSI indicator": [
            "RSI (Relative Strength Index) measures momentum on a 0-100 scale. Over 70 = overbought, under 30 = oversold.",
            "Divergences between RSI and price can signal potential reversals."
          ],
          "what is arbitrage trading": [
            "Arbitrage exploits price differences for the same asset across different markets/exchanges.",
            "Requires fast execution and significant capital to profit from small price discrepancies."
          ],
          "how to trade breakouts": [
            "Breakout trading involves entering when price moves beyond key support/resistance with increased volume.",
            "False breakouts are common - wait for confirmation (close beyond level) before entering."
          ],
          "what is a bull flag pattern": [
            "A bull flag forms after a strong uptrend, with consolidation (flag) followed by continuation upward.",
            "Measured move target is typically the length of the initial flagpole added to breakout point."
          ],
          "how to use Fibonacci retracement": [
            "Fibonacci levels (23.6%, 38.2%, 50%, 61.8%) identify potential support/resistance during pullbacks.",
            "Most traders watch the 61.8% level - breaking through often signals trend reversal rather than pullback."
          ],
          "what is market capitalization": [
            "Market cap = circulating supply × current price. Shows a crypto's total valuation relative to others.",
            "Large-cap (BTC, ETH) are more stable, small-cap have higher growth potential but more risk."
          ],
          "how to trade with Bollinger Bands": [
            "Bollinger Bands show volatility - price tends to stay within the bands (2 standard deviations from 20MA).",
            "Squeezes (narrowing bands) often precede big moves. Touching upper/lower bands doesn't necessarily mean reversal."
          ],
          "what is proof of stake": [
            "PoS is a consensus mechanism where validators stake crypto to secure the network and earn rewards.",
            "More energy efficient than PoW (mining). ETH, Cardano, Solana use variants of PoS."
          ],
          "how to use volume profile": [
            "Volume profile shows trading activity at specific price levels over time, revealing high-volume nodes.",
            "Prices often react at these high-volume levels, which can act as support/resistance."
          ],
          "what is a limit order": [
            "A limit order executes only at your specified price or better (buy below market, sell above).",
            "Provides price control but no execution guarantee if market doesn't reach your price."
          ],
          "how to trade gaps": [
            "Gaps occur when price jumps between sessions. Common in stocks after earnings, crypto on weekends.",
            "Gaps often get 'filled' later - trading gap fills can be profitable but risky if trend is strong."
          ],
          "what is the fear and greed index": [
            "Measures market sentiment from 0 (extreme fear) to 100 (extreme greed) using volatility, volume, social media etc.",
            "Contrarian indicator - extreme fear can signal buying opportunities, extreme greed may precede corrections."
          ],
          "how to use MACD indicator": [
            "MACD shows relationship between two MAs. Signal line crossovers and histogram changes indicate momentum shifts.",
            "Divergences between MACD and price can signal weakening trends before reversals."
          ],
          "what is a dead cat bounce": [
            "A temporary recovery in a declining market that fails to reverse the overall downtrend.",
            "Often traps buyers who mistake it for a bottom - wait for confirmation of trend change."
          ],
          "how to trade double tops/bottoms": [
            "Double top (M pattern) signals potential reversal after uptrend, double bottom (W pattern) after downtrend.",
            "Volume should diminish on second peak/trough and increase on breakout of neckline."
          ],
          "what is tether (USDT)": [
            "The largest stablecoin pegged 1:1 to USD, used for crypto trading pairs and preserving value during volatility.",
            "Controversial due to reserve transparency questions but remains dominant in trading volume."
          ],
          "how to use ichimoku cloud": [
            "Ichimoku provides support/resistance, momentum, and trend signals via multiple components (Tenkan, Kijun, Cloud etc).",
            "Price above cloud = uptrend, below = downtrend. Cloud twists often signal trend changes."
          ],
          "what is a vwap strategy": [
            "VWAP (Volume Weighted Average Price) helps traders assess whether they're getting good prices relative to day's activity.",
            "Institutional traders often use VWAP as benchmark - prices tend to revert to VWAP."
          ],
          "how to trade wedges": [
            "Wedges are converging trendlines signaling potential breakouts. Rising wedges often break down, falling wedges break up.",
            "Volume should decline as wedge forms, then expand on breakout for confirmation."
          ],
          "what is a flash crash": [
            "An extremely rapid, deep price drop followed by quick recovery, often caused by algorithmic trading or liquidity gaps.",
            "Can create buying opportunities but dangerous to catch falling knives - wait for stabilization."
          ],
          "how to use parabolic SAR": [
            "SAR dots appear below price in uptrends (buy signal) and above in downtrends (sell signal).",
            "Best for strong trending markets - causes whipsaws in ranging conditions."
          ],
          "what is a liquidity pool": [
            "In DeFi, pools of tokens locked in smart contracts that enable trading without traditional order books.",
            "Liquidity providers earn fees but face impermanent loss risk when prices fluctuate."
          ],
          "how to trade head and shoulders": [
            "Head & shoulders (top pattern) signals potential reversal after uptrend, inverse H&S after downtrend.",
            "Neckline breakout with increased volume confirms pattern. Target = distance from head to neckline."
          ],
          "what is a doji candle": [
            "A candle where open and close are nearly equal, showing indecision in the market.",
            "Particularly significant at key levels - may signal exhaustion and potential reversal."
          ],
          "how to use stochastic oscillator": [
            "Stochastic compares closing price to price range over period. Over 80 = overbought, under 20 = oversold.",
            "Look for crossovers of %K and %D lines, especially when leaving overbought/oversold territory."
          ],
          "what is a bull market": [
            "A sustained period of rising prices, typically characterized by investor optimism and economic growth.",
            "In crypto, bull markets often driven by halvings, institutional adoption, or technological breakthroughs."
          ],
          "how to trade triangles": [
            "Symmetrical triangles show consolidation before breakout. Ascending (bullish) and descending (bearish) triangles have bias.",
            "Volume should contract during formation, then expand on breakout for validity."
          ],
          "what is a market maker": [
            "Entities that provide liquidity by continuously quoting buy/sell prices, profiting from spreads.",
            "Essential for smooth markets but sometimes accused of manipulating prices near key levels."
          ],
          "how to use average true range": [
            "ATR measures volatility by calculating average range over a period (typically 14 days).",
            "Helps set stop-loss distances (e.g., 2×ATR) and gauge when volatility is expanding/contracting."
          ],
          "what is a bear market": [
            "A prolonged period of declining prices, typically by 20%+ from highs, with widespread pessimism.",
            "Crypto bear markets often see 80-90% drops from all-time highs before next cycle."
          ],
          "how to trade pennants": [
            "Pennants are small symmetrical triangles after strong moves, representing brief consolidation before continuation.",
            "Volume should drop during formation then spike on breakout. Measure move = length of initial flagpole."
          ],
          "what is a short squeeze": [
            "When prices rise rapidly, forcing short sellers to cover positions by buying, which drives price up further.",
            "Common in low-float stocks or low-cap cryptos with high short interest."
          ],
          "how to use volume indicators": [
            "OBV (On Balance Volume) adds/subtracts volume based on price direction, showing accumulation/distribution.",
            "Volume precedes price - increasing volume on moves confirms strength, decreasing volume suggests weakness."
          ],
          "what is a whale wallet": [
            "Crypto addresses holding large amounts that can significantly impact markets when they move funds.",
            "Whale tracking services monitor these wallets for potential large buys/sells."
          ],
          "how to trade cup and handle": [
            "Cup (U-shape) with smaller handle (pullback) forms bullish continuation pattern after uptrend.",
            "Breakout above handle resistance with volume confirms pattern. Target = depth of cup added to breakout."
          ],
          "what is a dusting attack": [
            "When small amounts of crypto are sent to wallets to potentially deanonymize owners through later transactions.",
            "Don't interact with unexpected small deposits - they may be malicious."
          ],
          "how to use pivot points": [
            "Pivot points calculate potential support/resistance levels based on previous day's high, low, and close.",
            "Day traders watch R1, R2 (resistances) and S1, S2 (supports) for intraday reversals."
          ],
          "what is a rug pull": [
            "When crypto developers abandon project and take investors' funds, often after pumping token price.",
            "Common in DeFi - research teams, audit reports, and liquidity locks can help avoid rugs."
          ],
          "how to trade with elliott wave": [
            "Elliott Wave Theory suggests markets move in 5-wave impulses and 3-wave corrections.",
            "Highly subjective but useful for identifying potential trend exhaustion points when waves complete."
          ],
          "what is impermanent loss": [
            "Temporary loss liquidity providers experience when pooled assets' prices diverge from initial deposit ratios.",
            "Most severe when one asset in pair dramatically outperforms the other."
          ],
          "how to use the supertrend indicator": [
            "Supertrend flips between buy/sell signals based on volatility-adjusted moving averages.",
            "Works well in trending markets but like all indicators, produces false signals in ranges."
          ],
          "what is a futures contract": [
            "Agreement to buy/sell asset at predetermined price on future date. Allows leverage and hedging.",
            "Crypto futures often trade at premium (contango) or discount (backwardation) to spot price."
          ],
          "how to trade with keltner channels": [
            "Keltner Channels use ATR for volatility-based envelope around an exponential moving average.",
            "Similar to Bollinger Bands but smoother - reversals often occur at channel edges in mean-reverting strategies."
          ],
          "what is a governance token": [
            "Tokens granting holders voting rights on protocol decisions in DAOs and DeFi projects.",
            "Examples: UNI (Uniswap), MKR (MakerDAO). Value depends on protocol success and voter participation."
          ],
          "how to use the adx indicator": [
            "ADX (Average Directional Index) measures trend strength (not direction) on 0-100 scale.",
            "Above 25 = strong trend, below 20 = weak/no trend. Often used with +DI/-DI lines for direction."
          ],
          "what is a hard fork": [
            "Permanent divergence in blockchain creating two separate networks (e.g., BTC/BCH, ETH/ETC).",
            "Occurs when consensus can't be reached on protocol changes. Often creates volatility around event."
          ],
          "how to trade with volume-weighted macd": [
            "VWAP-based MACD variant that incorporates volume into momentum calculations.",
            "Reduces false signals in low-volume conditions compared to traditional MACD."
          ],
          "what is an nft": [
            "Non-fungible tokens represent unique digital ownership (art, collectibles, etc.) on blockchains.",
            "NFT markets are highly speculative with values driven by cultural relevance and community more than utility."
          ],
          "how to use the choppiness index": [
            "Measures whether market is trending (low values) or ranging (high values) over lookback period.",
            "Helps avoid using trend-following strategies in choppy, directionless markets."
          ],
          "what is a soft fork": [
            "Backward-compatible blockchain upgrade where non-upgraded nodes still follow new rules.",
            "Less disruptive than hard forks - examples include Bitcoin's SegWit activation."
          ],
          "how to trade with the alligator indicator": [
            "Uses three smoothed MAs (jaw, teeth, lips) that intertwine during consolidation and fan out in trends.",
            "Trading signals occur when lines separate after period of being intertwined."
          ],
          "what is a dex": [
            "Decentralized exchange allows peer-to-peer trading without intermediaries using smart contracts.",
            "Examples: Uniswap, PancakeSwap. Offer anonymity but may have higher slippage than CEXs for large orders."
          ],
          "how to use the money flow index": [
            "MFI combines price and volume to measure buying/selling pressure (like RSI but with volume).",
            "Over 80 = overbought, under 20 = oversold. Divergences can signal reversals."
          ],
          "what is a 51% attack": [
            "When entity controls majority of blockchain's hashrate, allowing double-spending and chain reorganization.",
            "Smaller PoW chains are most vulnerable. PoS chains have different security considerations."
          ],
          "how to trade with the zigzag indicator": [
            "Filters small price movements to highlight significant trends and reversals by percentage/threshold.",
            "Useful for identifying classic chart patterns by reducing market noise."
          ],
          "what is a layer 2 solution": [
            "Scaling solutions built atop layer 1 blockchains (e.g., Lightning for BTC, Optimism for ETH).",
            "Reduce fees and congestion by processing transactions off main chain then settling periodically."
          ],
          "how to use the vortex indicator": [
            "VI+ and VI- lines measure positive/negative trend movement. Crossover signals potential trend changes.",
            "Particularly effective when combined with other trend confirmation tools."
          ],
          "what is a bridge in crypto": [
            "Protocols enabling transfer of assets between different blockchains (e.g., ETH to BSC).",
            "Security risks exist - several major hacks have occurred on cross-chain bridges."
          ],
          "how to trade with the awesome oscillator": [
            "AO measures market momentum using difference between 34-period and 5-period simple MAs.",
            "Saucer and crossing strategies work best. Above zero = bullish bias, below = bearish."
          ],
          "what is proof of work": [
            "PoW consensus requires miners to solve cryptographic puzzles to validate transactions (BTC, ETH pre-merge).",
            "Energy-intensive but highly secure against attacks due to hardware/electricity costs."
          ],
          "how to use the commodity channel index": [
            "CCI measures current price relative to statistical average. Over +100 = strong uptrend, under -100 = strong downtrend.",
            "Works well for identifying cyclical turns in commodities and crypto markets."
          ],
          "what is a stablecoin": [
            "Cryptocurrencies pegged to stable assets (usually USD) to minimize volatility.",
            "Types: fiat-collateralized (USDC), crypto-collateralized (DAI), algorithmic (failed examples like UST)."
          ],
          "how to trade with the demarker indicator": [
            "DeM compares current max/min to previous period's to identify overbought/oversold conditions.",
            "Values range 0-1. Above 0.7 = overbought, below 0.3 = oversold."
          ],
          "what is a smart contract": [
            "Self-executing code on blockchains that automatically enforces agreement terms when conditions met.",
            "Enables DeFi, NFTs, DAOs. Vulnerable to bugs - always audit code before investing in projects."
          ],
          "how to use the know sure thing indicator": [
            "KST combines multiple ROC periods into single momentum oscillator with signal line.",
            "Crossovers and divergences provide signals. Less choppy than using single ROC period."
          ],
          "what is a dao": [
            "Decentralized Autonomous Organization governed by smart contracts and member votes via governance tokens.",
            "Aims to eliminate centralized control but faces challenges in coordination and legal recognition."
          ],
          "how to trade with the trix indicator": [
            "TRIX shows percent rate-of-change of triple-smoothed EMA to filter out insignificant price movements.",
            "Crossing zero line signals momentum shifts. Often used with signal line for crossovers."
          ],
          "what is yield farming": [
            "Earning rewards (usually in crypto) by providing liquidity to DeFi protocols through staking or lending.",
            "Higher APYs come with higher risks (impermanent loss, smart contract vulnerabilities)."
          ],
          "how to use the ultimate oscillator": [
            "Combines momentum across three timeframes to reduce false signals from single-period oscillators.",
            "Buy when UO rises from oversold (<30) during uptrend, sell when falls from overbought (>70) in downtrend."
          ],
          "what is sharding": [
            "Blockchain scaling technique that splits network into parallel chains (shards) processing separate transactions.",
            "ETH 2.0 plans to implement sharding to increase throughput while maintaining decentralization."
          ],
          "how to trade with the chande momentum oscillator": [
            "CMO compares sum of up moves to down moves over period, ranging from +100 to -100.",
            "Over +50 = overbought, under -50 = oversold. Works well for mean-reversion strategies."
          ],
          "what is a wrapped token": [
            "Representation of asset on non-native blockchain (e.g., WBTC is Bitcoin on Ethereum network).",
            "Enables cross-chain functionality but introduces custodial risk with backing reserves."
          ],
          "how to use the relative vigor index": [
            "RVI measures conviction behind price moves by comparing closing price to trading range.",
            "Signal line crossovers and divergences with price provide trading signals."
          ],
          "what is mev": [
            "Miner Extractable Value (now Maximal Extractable Value) - profit miners/validators gain by reordering transactions.",
            "Includes frontrunning and sandwich attacks - major concern in DeFi requiring solutions like flashbots."
          ],
          "how to trade with the percentage price oscillator": [
            "PPO shows percentage difference between two EMAs (like MACD but percentage-based for cross-asset comparison).",
            "Crossings of centerline and signal line provide momentum signals comparable to MACD."
          ],
          "what is a liquidity mine": [
            "Incentive program where users earn tokens by providing liquidity to DeFi protocols.",
            "Often have high initial APYs that decrease over time as more participants join."
          ],
          "how to use the accumulation distribution line": [
            "ADL combines price and volume to show whether accumulation (buying) or distribution (selling) is occurring.",
            "Divergences between ADL and price often precede reversals."
          ],
          "what is zero-knowledge proof": [
            "Cryptographic method proving statement's truth without revealing underlying information.",
            "ZK-rollups use this to scale blockchains by bundling transactions with validity proofs."
          ],
          "how to trade with the mass index": [
            "Measures volatility contraction/expansion by analyzing trading range over period.",
            "High values suggest impending reversal - often used with other indicators to time breakouts."
          ],
          "what is a perpetual contract": [
            "Derivative that mimics spot trading but with leverage, no expiration date, and funding fees.",
            "Dominant crypto trading instrument - funding rates indicate long/short imbalance."
          ],
          "how to use the ease of movement indicator": [
            "EOM measures price change relative to volume - high values show price moving easily on low volume.",
            "Helps identify when markets are 'light' and prone to sharp moves versus 'heavy' and stable."
          ],
          "what is a hash rate": [
            "Measure of computational power securing PoW blockchain. Higher hashrate = more security.",
            "BTC hashrate follows price with lag - drops in bear markets as miners become unprofitable."
          ],
          "how to trade with the coppock curve": [
            "Long-term momentum indicator designed to identify bull market beginnings after downturns.",
            "Originally developed for stocks but applicable to crypto cycles. Buy when curve rises from negative territory."
          ],
          "what is a seed phrase": [
            "12-24 word sequence that controls access to crypto wallets. Anyone with phrase controls assets.",
            "Must be stored securely offline - never digitally. Hardware wallets provide safest storage."
          ],
          "how to use the detrended price oscillator": [
            "DPO removes long-term trends to highlight shorter cycles by centering moving average.",
            "Effective for identifying overbought/oversold levels within established trading ranges."
          ],
          "what is a mixer": [
            "Service that obscures transaction trails by pooling and redistributing funds (e.g., Tornado Cash).",
            "Privacy tools but increasingly regulated due to potential money laundering concerns."
          ],
          "how to trade with the klinger volume oscillator": [
            "KVO combines volume and price trends to confirm money flow direction and strength.",
            "Bullish when above zero line and rising, bearish when below and falling."
          ],
          "what is a paper wallet": [
            "Offline cold storage method where private keys are physically printed (now generally discouraged).",
            "Vulnerable to physical damage and insecure generation methods - hardware wallets preferred."
          ],
          "how to use the chaikin money flow": [
            "CMF combines price and volume over time to measure buying/selling pressure.",
            "Above zero = accumulation, below = distribution. Divergences often precede price reversals."
          ],
          "what is a dust limit": [
            "Minimum transaction amount a blockchain will process (e.g., 546 satoshis for Bitcoin).",
            "Prevents network spam but can leave unspendable tiny balances in wallets."
          ],
          "how to trade with the schaff trend cycle": [
            "STC combines MACD and stochastic concepts into single oscillator designed to reduce false signals.",
            "Crossings of signal line and centerline provide momentum-based trading signals."
          ],
          "what is a taproot": [
            "Bitcoin upgrade (activated 2021) improving privacy, efficiency, and smart contract capabilities.",
            "Lays foundation for more complex transactions while reducing on-chain footprint."
          ],
          "how to use the elder ray index": [
            "Measures buying/selling pressure by comparing price to exponential moving averages.",
            "Bull power (highs - EMA) and bear power (lows - EMA) show underlying strength/weakness."
          ],
          "what is a light node": [
            "Blockchain client that doesn't store full history, relying on others for some data (vs. full node).",
            "Enables participation with lower hardware requirements but reduces network decentralization."
          ],
          "how to trade with the qstick indicator": [
            "Qstick measures average tendency of closes to be higher/lower than opens over period.",
            "Positive values suggest bullish bias (closes > opens), negative values show bearish tendency."
          ],
          "what is a mempool": [
            "Where unconfirmed transactions wait before being included in blocks by miners/validators.",
            "Mempool size indicates network congestion - high fees required when backlogged."
          ],
          "how to use the donchian channels": [
            "Forms upper/lower bands based on highest high and lowest low over lookback period.",
            "Breakouts above upper or below lower channel signal potential trend continuations."
          ],
          "what is a timechain": [
            "Alternative term for blockchain emphasizing its function as immutable timestamped ledger.",
            "Particularly relevant for Bitcoin's use case as decentralized timestamping service."
          ],
          "how to trade with the aroon indicator": [
            "Aroon Up measures time since highest high, Aroon Down time since lowest low over period.",
            "Crossovers and readings near 100/0 help identify trend strength and potential changes."
          ],
          "what is a vanity address": [
            "Custom crypto address containing specific desired characters (like name) for branding/verification.",
            "Generated through computation - no security difference from random addresses."
          ],
          "how to use the williams %r": [
            "Momentum oscillator measuring overbought/oversold levels, inverted to range from 0 to -100.",
            "Above -20 = overbought, below -80 = oversold. Works best with other confirmation signals."
          ],
          "what is a full node": [
            "Computer fully validating blockchain rules and history without trusting third parties.",
            "Essential for network decentralization - running one increases privacy and security."
          ],
          "how to trade with the ttm squeeze": [
            "Identifies periods of low volatility (Bollinger Bands inside Keltner Channels) preceding expansions.",
            "Momentum histogram shows direction of likely breakout - combines volatility and momentum analysis."
          ],
          "what is a utxo": [
            "Unspent Transaction Output - Bitcoin's accounting model where each transaction consumes and creates outputs.",
            "Differs from account-based models (like Ethereum) where balances are directly updated."
          ],
          "how to use the standard deviation indicator": [
            "Measures volatility by how much price deviates from its average over given period.",
            "Higher values indicate more volatility - often used to adjust position sizing strategies."
          ],
          "what is a segwit address": [
            "Address format enabling Bitcoin's Segregated Witness upgrade that increased block capacity.",
            "Begins with 'bc1' - more efficient than legacy addresses but not all services support."
          ],
          "how to trade with the vortex indicator": [
            "VI+ and VI- lines measure positive/negative trend movement. Crossover signals potential trend changes.",
            "Particularly effective when combined with other trend confirmation tools."
          ],
          "what is a bech32 address": [
            "Native SegWit Bitcoin address format (bc1q) offering lower fees and error detection benefits.",
            "Not universally supported but becoming standard due to efficiency advantages."
          ],
          "how to use the typical price indicator": [
            "Calculates average of high, low, and close for each period to smooth price data.",
            "Useful as alternative to closing prices in various indicators and moving average calculations."
          ],
          "what is a lightning network": [
            "Bitcoin's layer 2 solution enabling instant, low-fee micropayments through payment channels.",
            "Channels open/close on-chain but transactions occur off-chain with unlimited throughput."
          ],
          "how to trade with the median price indicator": [
            "Uses midpoint between high and low instead of close price for smoother representation.",
            "Often used in pivot point calculations or as alternative input for other indicators."
          ],
          "what is a watch-only wallet": [
            "Software that monitors addresses but can't spend funds (no private keys stored).",
            "Enables tracking holdings securely on internet-connected devices without exposure to theft."
          ],
          "how to use the chandelier exit": [
            "Volatility-based trailing stop that adjusts based on ATR to lock in profits during trends.",
            "Long positions exit when price closes below highest high minus 3×ATR (adjustable multiplier)."
          ],
          "what is a paper trading account": [
            "Simulated trading with fake money to practice strategies risk-free before using real capital.",
            "Available on most platforms but lacks psychological impact of real money decisions."
          ],
          "how to trade with the mfi indicator": [
            "Money Flow Index combines price and volume to measure buying/selling pressure (like RSI but volume-weighted).",
            "Over 80 = overbought, under 20 = oversold. Divergences often precede reversals."
          ],
          "what is a hardware wallet": [
            "Physical device storing crypto keys offline, considered most secure against hacks.",
            "Examples: Ledger, Trezor. Must be purchased from official sources to avoid tampering."
          ],
          "how to use the kijun-sen line": [
            "Base line in Ichimoku system calculated as average of highest high and lowest low over 26 periods.",
            "Acts as dynamic support/resistance - price above = bullish bias, below = bearish."
          ],
          "what is a multi-sig wallet": [
            "Requires multiple private keys to authorize transactions, increasing security against theft.",
            "Common setups (2-of-3, 3-of-5) allow redundancy while preventing single point of failure."
          ],
          "how to trade with the tenkan-sen line": [
            "Conversion line in Ichimoku system calculated as average of 9-period high and low.",
            "Crossings with kijun-sen generate signals - tenkan above kijun = bullish, below = bearish."
          ],
          "what is a hot wallet": [
            "Crypto wallet connected to internet for convenient access but higher security risks.",
            "Suitable for small amounts like daily spending money, with bulk stored in cold storage."
          ],
          "how to use the senkou span": [
            "Leading spans in Ichimoku that form the 'cloud' by projecting 26 periods ahead.",
            "Cloud acts as future support/resistance - thickness indicates strength of potential reversal zones."
          ],
          "what is a cold wallet": [
            "Offline storage for crypto (paper or hardware wallets) with no internet connectivity.",
            "Essential for securing large holdings - only transfer to hot wallets when needed."
          ],
          "how to trade with the chikou span": [
            "Lagging span in Ichimoku plotted 26 periods behind current price to confirm trend strength.",
            "Price above chikou = bullish confirmation, below = bearish. Also shows historical support/resistance."
          ]
    };
    if (knowledgeBase[normalizedMessage]) {
      const responses = knowledgeBase[normalizedMessage];
      return responses[Math.floor(Math.random() * responses.length)];
    } else {
      return "I'm sorry, I didn't understand that. Can you ask something else?";
    }
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

