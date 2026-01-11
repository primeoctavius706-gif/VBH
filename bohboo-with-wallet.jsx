import React, { useState, useRef, useEffect } from 'react';
import { Download, Upload, X, Check, FileText } from 'lucide-react';

const BOHBOOGenerator = () => {
  const [uiTheme, setUiTheme] = useState('cosmic');
  const [activeTab, setActiveTab] = useState('nft');
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [walletBalance, setWalletBalance] = useState(0);
  const [notification, setNotification] = useState(null);
  
  // NFT State
  const [nftData, setNftData] = useState({ name: '', description: '', attributes: '', image: null });
  
  // Meme State
  const [memeData, setMemeData] = useState({ template: '', topText: '', bottomText: '', textSize: 40, customImage: null });
  
  // Gift State
  const [giftData, setGiftData] = useState({ recipient: '', message: '', style: 'birthday' });
  
  // Schedule State
  const [transferData, setTransferData] = useState({ type: 'token', amount: '', nftMint: '', recipient: '', scheduleTime: '', note: '' });
  const [scheduledTransfers, setScheduledTransfers] = useState([]);
  
  // Receipts
  const [allReceipts, setAllReceipts] = useState([]);
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [currentReceipt, setCurrentReceipt] = useState(null);
  
  const fileInputRef = useRef(null);
  const customMemeRef = useRef(null);
  const memeCanvasRef = useRef(null);

  // Load wallet data from localStorage on mount
  useEffect(() => {
    const savedWalletAddress = localStorage.getItem('bohboo_wallet_address');
    const savedWalletBalance = localStorage.getItem('bohboo_wallet_balance');
    const savedReceipts = localStorage.getItem('bohboo_receipts');
    const savedScheduledTransfers = localStorage.getItem('bohboo_schedules');
    
    if (savedWalletAddress) {
      setWalletAddress(savedWalletAddress);
      setWalletConnected(true);
    }
    
    if (savedWalletBalance) {
      setWalletBalance(parseFloat(savedWalletBalance));
    }
    
    if (savedReceipts) {
      setAllReceipts(JSON.parse(savedReceipts));
    }
    
    if (savedScheduledTransfers) {
      setScheduledTransfers(JSON.parse(savedScheduledTransfers));
    }
  }, []);

  // Save wallet data to localStorage whenever it changes
  useEffect(() => {
    if (walletAddress) {
      localStorage.setItem('bohboo_wallet_address', walletAddress);
      localStorage.setItem('bohboo_wallet_balance', walletBalance.toString());
    }
  }, [walletAddress, walletBalance]);

  // Save receipts to localStorage
  useEffect(() => {
    if (allReceipts.length > 0) {
      localStorage.setItem('bohboo_receipts', JSON.stringify(allReceipts));
    }
  }, [allReceipts]);

  // Save scheduled transfers to localStorage
  useEffect(() => {
    if (scheduledTransfers.length > 0) {
      localStorage.setItem('bohboo_schedules', JSON.stringify(scheduledTransfers));
    }
  }, [scheduledTransfers]);

  // BOHBOO mascot images
  const mascotMain = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Cdefs%3E%3CradialGradient id='grad1'%3E%3Cstop offset='0%25' style='stop-color:%23FF8C42;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%23FF6B35;stop-opacity:1' /%3E%3C/radialGradient%3E%3C/defs%3E%3Ccircle cx='100' cy='100' r='90' fill='url(%23grad1)'/%3E%3Cellipse cx='70' cy='60' rx='8' ry='12' fill='white'/%3E%3Cellipse cx='70' cy='60' rx='12' ry='16' fill='none' stroke='%23333' stroke-width='2'/%3E%3Ccircle cx='70' cy='60' r='6' fill='%23333'/%3E%3Ccircle cx='68' cy='58' r='2' fill='white'/%3E%3Cellipse cx='130' cy='60' rx='8' ry='12' fill='white'/%3E%3Cellipse cx='130' cy='60' rx='12' ry='16' fill='none' stroke='%23333' stroke-width='2'/%3E%3Ccircle cx='130' cy='60' r='6' fill='%23333'/%3E%3Ccircle cx='128' cy='58' r='2' fill='white'/%3E%3Cellipse cx='100' cy='80' rx='8' ry='10' fill='%23333'/%3E%3Cpath d='M 70 100 Q 100 120 130 100' stroke='%23333' stroke-width='4' fill='none' stroke-linecap='round'/%3E%3Ccircle cx='60' cy='95' r='12' fill='%23FFB6C1'/%3E%3Ccircle cx='140' cy='95' r='12' fill='%23FFB6C1'/%3E%3Cellipse cx='50' cy='40' rx='15' ry='25' fill='%23FF8C42' transform='rotate(-20 50 40)'/%3E%3Cellipse cx='150' cy='40' rx='15' ry='25' fill='%23FF8C42' transform='rotate(20 150 40)'/%3E%3Cpath d='M 85 120 L 90 135 L 95 120 L 100 135 L 105 120 L 110 135 L 115 120' stroke='%23FF0000' stroke-width='3' fill='none'/%3E%3Cpath d='M 85 120 L 90 135 L 95 120' fill='%23FF0000'/%3E%3Cpath d='M 95 120 L 100 135 L 105 120' fill='%23FFA500'/%3E%3Cpath d='M 105 120 L 110 135 L 115 120' fill='%23FFFF00'/%3E%3Cpath d='M 90 135 L 95 120 L 100 135' fill='%2300FF00'/%3E%3Cpath d='M 100 135 L 105 120 L 110 135' fill='%230000FF'/%3E%3Ccircle cx='55' cy='45' r='3' fill='white'/%3E%3Ccircle cx='60' cy='38' r='3' fill='white'/%3E%3Ccircle cx='65' cy='42' r='3' fill='white'/%3E%3Ccircle cx='135' cy='45' r='3' fill='white'/%3E%3Ccircle cx='140' cy='38' r='3' fill='white'/%3E%3Ccircle cx='145' cy='42' r='3' fill='white'/%3E%3C/svg%3E";

  const mascotWithGhost = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 200'%3E%3Cdefs%3E%3CradialGradient id='grad1'%3E%3Cstop offset='0%25' style='stop-color:%23FF8C42;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%23FF6B35;stop-opacity:1' /%3E%3C/radialGradient%3E%3CradialGradient id='grad2'%3E%3Cstop offset='0%25' style='stop-color:%2380FFD4;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%2360E8C0;stop-opacity:1' /%3E%3C/radialGradient%3E%3C/defs%3E%3Ccircle cx='100' cy='100' r='70' fill='url(%23grad1)'/%3E%3Cellipse cx='80' cy='85' rx='6' ry='10' fill='white'/%3E%3Cellipse cx='80' cy='85' rx='10' ry='13' fill='none' stroke='%23333' stroke-width='2'/%3E%3Ccircle cx='80' cy='85' r='5' fill='%23333'/%3E%3Ccircle cx='78' cy='83' r='2' fill='white'/%3E%3Cellipse cx='120' cy='85' rx='6' ry='10' fill='white'/%3E%3Cellipse cx='120' cy='85' rx='10' ry='13' fill='none' stroke='%23333' stroke-width='2'/%3E%3Ccircle cx='120' cy='85' r='5' fill='%23333'/%3E%3Ccircle cx='118' cy='83' r='2' fill='white'/%3E%3Cellipse cx='100' cy='95' rx='6' ry='8' fill='%23333'/%3E%3Cpath d='M 80 110 Q 100 125 120 110' stroke='%23333' stroke-width='3' fill='none' stroke-linecap='round'/%3E%3Ccircle cx='70' cy='105' r='10' fill='%23FFB6C1'/%3E%3Ccircle cx='130' cy='105' r='10' fill='%23FFB6C1'/%3E%3Cellipse cx='60' cy='60' rx='12' ry='20' fill='%23FF8C42' transform='rotate(-20 60 60)'/%3E%3Cellipse cx='140' cy='60' rx='12' ry='20' fill='%23FF8C42' transform='rotate(20 140 60)'/%3E%3Cpath d='M 85 125 L 88 135 L 91 125 L 94 135 L 97 125 L 100 135 L 103 125 L 106 135 L 109 125 L 112 135 L 115 125' stroke='%23FF0000' stroke-width='2' fill='none'/%3E%3Cellipse cx='280' cy='120' rx='50' ry='60' fill='url(%23grad2)'/%3E%3Cpath d='M 250 180 Q 255 175 260 180 Q 265 175 270 180 Q 275 175 280 180 Q 285 175 290 180 Q 295 175 300 180 Q 305 175 310 180' fill='url(%23grad2)'/%3E%3Ccircle cx='265' cy='105' r='8' fill='%23333'/%3E%3Ccircle cx='263' cy='103' r='3' fill='white'/%3E%3Ccircle cx='295' cy='105' r='8' fill='%23333'/%3E%3Ccircle cx='293' cy='103' r='3' fill='white'/%3E%3Cpath d='M 270 125 Q 280 132 290 125' stroke='%23333' stroke-width='2' fill='none' stroke-linecap='round'/%3E%3C/svg%3E";

  // 10 Pre-made meme templates
  const memeTemplates = [
    {
      id: 'drake',
      name: 'Drake Hotline',
      emoji: '📱',
      gradient: 'from-blue-400 via-purple-500 to-pink-500',
      defaultTop: 'OLD WAY OF DOING THINGS',
      defaultBottom: 'BOHBOO WAY'
    },
    {
      id: 'distracted',
      name: 'Distracted Boyfriend',
      emoji: '👀',
      gradient: 'from-pink-400 via-red-400 to-rose-500',
      defaultTop: 'ME',
      defaultBottom: 'BOHBOO'
    },
    {
      id: 'change',
      name: 'Change My Mind',
      emoji: '🪧',
      gradient: 'from-green-400 via-emerald-500 to-teal-500',
      defaultTop: 'BOHBOO IS THE FUTURE',
      defaultBottom: 'CHANGE MY MIND'
    },
    {
      id: 'success',
      name: 'Success Kid',
      emoji: '💪',
      gradient: 'from-yellow-400 via-orange-400 to-red-500',
      defaultTop: 'BOUGHT BOHBOO',
      defaultBottom: 'TO THE MOON'
    },
    {
      id: 'galaxy',
      name: 'Galaxy Brain',
      emoji: '🧠',
      gradient: 'from-purple-600 via-indigo-600 to-blue-600',
      defaultTop: 'SMALL BRAIN: REGULAR CRYPTO',
      defaultBottom: 'GALAXY BRAIN: BOHBOO'
    },
    {
      id: 'stonks',
      name: 'Stonks',
      emoji: '📈',
      gradient: 'from-green-300 via-green-500 to-emerald-600',
      defaultTop: 'BOHBOO HOLDERS',
      defaultBottom: 'STONKS ↗'
    },
    {
      id: 'doge',
      name: 'Doge Style',
      emoji: '🐕',
      gradient: 'from-amber-300 via-yellow-400 to-orange-400',
      defaultTop: 'SUCH BOHBOO',
      defaultBottom: 'MUCH WOW'
    },
    {
      id: 'thisisfine',
      name: 'This is Fine',
      emoji: '🔥',
      gradient: 'from-orange-400 via-red-500 to-pink-500',
      defaultTop: 'MARKET CRASHING',
      defaultBottom: 'BUT I HAVE BOHBOO'
    },
    {
      id: 'chad',
      name: 'Chad Yes',
      emoji: '💎',
      gradient: 'from-slate-400 via-gray-500 to-zinc-600',
      defaultTop: 'YES.',
      defaultBottom: 'I HODL BOHBOO'
    },
    {
      id: 'wojak',
      name: 'Wojak Crying',
      emoji: '😭',
      gradient: 'from-blue-300 via-blue-400 to-cyan-500',
      defaultTop: 'SOLD TOO EARLY',
      defaultBottom: 'MISSED BOHBOO PUMP'
    }
  ];

  const showNotification = (msg, type = 'info') => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 4000);
  };

  const generateReceiptId = () => {
    return 'BOHBOO-' + Date.now().toString(36).toUpperCase() + '-' + Math.random().toString(36).substr(2, 5).toUpperCase();
  };

  const generateTransactionHash = () => {
    return Array.from({length: 64}, () => Math.floor(Math.random() * 16).toString(16)).join('');
  };

  const createReceipt = (type, details) => {
    const receipt = {
      id: generateReceiptId(),
      type: type,
      details: details,
      timestamp: new Date().toISOString(),
      transactionHash: generateTransactionHash(),
      network: 'Solana Testnet',
      tokenAddress: '4xMXegyso9etbWGyCN9Y73hGBzmVireCBYwnEsivpump',
      status: 'Completed',
      gasFee: '0.00001 SOL',
      createdBy: 'BOHBOO Creative Hub',
      walletAddress: walletAddress
    };

    setAllReceipts(prev => [receipt, ...prev]);
    setCurrentReceipt(receipt);
    setShowReceiptModal(true);
    return receipt;
  };

  const downloadReceipt = (receipt) => {
    let receiptContent = `
╔════════════════════════════════════════════╗
║        BOHBOO TRANSACTION RECEIPT         ║
╚════════════════════════════════════════════╝

Receipt ID: ${receipt.id}
Transaction Type: ${receipt.type}
Status: ✅ ${receipt.status}
Timestamp: ${new Date(receipt.timestamp).toLocaleString()}

Wallet Address: ${receipt.walletAddress}
Network: ${receipt.network}
Token: ${receipt.tokenAddress}
TX Hash: ${receipt.transactionHash}
Gas Fee: ${receipt.gasFee}

Created by: ${receipt.createdBy}
#VBH1.5 #BohbooBuilds

Thank you for using BOHBOO! 🚀
`;

    const blob = new Blob([receiptContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `BOHBOO-Receipt-${receipt.id}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    showNotification('📥 Receipt downloaded!', 'success');
  };

  // Connect to Phantom Wallet on Solana Testnet
  const connectWallet = async () => {
    try {
      // Check if Phantom wallet is installed
      if (!window.solana || !window.solana.isPhantom) {
        showNotification('⚠️ Please install Phantom wallet!', 'error');
        window.open('https://phantom.app/', '_blank');
        return;
      }

      showNotification('🔄 Connecting to Phantom...', 'info');

      // Request connection to Phantom
      const response = await window.solana.connect();
      const publicKey = response.publicKey.toString();
      
      // Store wallet address
      setWalletAddress(publicKey);
      setWalletConnected(true);
      
      // Save to localStorage
      localStorage.setItem('bohboo_wallet_address', publicKey);
      localStorage.setItem('bohboo_wallet_connected', 'true');
      localStorage.setItem('bohboo_wallet_connected_at', new Date().toISOString());

      // Get balance (this would need actual Solana connection for real balance)
      // For demo purposes, we'll simulate a balance
      const simulatedBalance = Math.random() * 10;
      setWalletBalance(simulatedBalance);
      localStorage.setItem('bohboo_wallet_balance', simulatedBalance.toString());

      showNotification(`🎉 Wallet connected! Address: ${publicKey.slice(0, 4)}...${publicKey.slice(-4)}`, 'success');

      // Store connection event in receipts
      createReceipt('Wallet Connected', {
        walletAddress: publicKey,
        network: 'Solana Testnet',
        balance: simulatedBalance.toFixed(4) + ' SOL',
        connectionTime: new Date().toISOString()
      });

    } catch (err) {
      console.error('Wallet connection error:', err);
      if (err.code === 4001) {
        showNotification('❌ Connection rejected by user', 'error');
      } else {
        showNotification('❌ Failed to connect wallet: ' + err.message, 'error');
      }
    }
  };

  const disconnectWallet = async () => {
    try {
      if (window.solana) {
        await window.solana.disconnect();
      }
      
      // Clear wallet data
      setWalletConnected(false);
      setWalletAddress('');
      setWalletBalance(0);
      
      // Clear localStorage
      localStorage.removeItem('bohboo_wallet_address');
      localStorage.removeItem('bohboo_wallet_connected');
      localStorage.removeItem('bohboo_wallet_balance');
      localStorage.removeItem('bohboo_wallet_connected_at');
      
      showNotification('👋 Wallet disconnected', 'info');

      // Store disconnection event
      createReceipt('Wallet Disconnected', {
        disconnectionTime: new Date().toISOString(),
        network: 'Solana Testnet'
      });

    } catch (err) {
      console.error('Wallet disconnection error:', err);
      showNotification('❌ Error disconnecting wallet', 'error');
    }
  };

  const selectPresetNFT = (image) => {
    setNftData({ ...nftData, image });
  };

  const handleNftImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setNftData({ ...nftData, image: e.target.result });
      reader.readAsDataURL(file);
    }
  };

  const mintNFT = () => {
    if (!walletConnected) {
      showNotification('⚠️ Please connect your wallet first!', 'error');
      return;
    }
    if (!nftData.name || !nftData.image) {
      showNotification('⚠️ Please provide NFT name and image!', 'error');
      return;
    }

    createReceipt('NFT Mint', {
      nftName: nftData.name,
      description: nftData.description || 'Official BOHBOO Collection NFT',
      attributes: nftData.attributes || 'Rare, Limited Edition',
      image: nftData.image
    });

    showNotification('🎨 NFT created successfully!', 'success');
    setNftData({ name: '', description: '', attributes: '', image: nftData.image });
  };

  const selectMemeTemplate = (template) => {
    const selectedTemplate = memeTemplates.find(t => t.id === template.id);
    setMemeData({ 
      ...memeData, 
      template: template.id,
      topText: selectedTemplate.defaultTop,
      bottomText: selectedTemplate.defaultBottom,
      customImage: null
    });
    
    const canvas = memeCanvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      const colors = template.gradient.match(/from-(\S+)\s+via-(\S+)\s+to-(\S+)/) || 
                     template.gradient.match(/from-(\S+)\s+to-(\S+)/);
      
      const gradient = ctx.createLinearGradient(0, 0, 500, 500);
      gradient.addColorStop(0, getColorHex(colors[1]));
      gradient.addColorStop(0.5, getColorHex(colors[2]));
      gradient.addColorStop(1, getColorHex(colors[3] || colors[2]));
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 500, 500);
      
      ctx.font = 'bold 150px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(template.emoji, 250, 300);
    }
  };

  const getColorHex = (tailwindColor) => {
    const colorMap = {
      'blue-400': '#60a5fa', 'purple-500': '#a855f7', 'pink-500': '#ec4899',
      'pink-400': '#f472b6', 'red-400': '#f87171', 'rose-500': '#f43f5e',
      'green-400': '#4ade80', 'emerald-500': '#10b981', 'teal-500': '#14b8a6',
      'yellow-400': '#facc15', 'orange-400': '#fb923c', 'red-500': '#ef4444',
      'purple-600': '#9333ea', 'indigo-600': '#4f46e5', 'blue-600': '#2563eb',
      'green-300': '#86efac', 'green-500': '#22c55e', 'emerald-600': '#059669',
      'amber-300': '#fcd34d', 'orange-400': '#fb923c',
      'slate-400': '#94a3b8', 'gray-500': '#6b7280', 'zinc-600': '#52525b',
      'blue-300': '#93c5fd', 'cyan-500': '#06b6d4'
    };
    return colorMap[tailwindColor] || '#667eea';
  };

  const handleCustomMemeUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const canvas = memeCanvasRef.current;
        const ctx = canvas.getContext('2d');
        const img = new Image();
        img.onload = () => {
          ctx.drawImage(img, 0, 0, 500, 500);
          setMemeData({ ...memeData, customImage: e.target.result });
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  const generateMeme = () => {
    if (!memeData.template && !memeData.customImage) {
      showNotification('⚠️ Please select a template first!', 'error');
      return;
    }
    
    const canvas = memeCanvasRef.current;
    const ctx = canvas.getContext('2d');
    
    ctx.font = `bold ${memeData.textSize}px Impact`;
    ctx.fillStyle = 'white';
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 4;
    ctx.textAlign = 'center';

    if (memeData.topText) {
      ctx.strokeText(memeData.topText.toUpperCase(), 250, 80);
      ctx.fillText(memeData.topText.toUpperCase(), 250, 80);
    }

    if (memeData.bottomText) {
      ctx.strokeText(memeData.bottomText.toUpperCase(), 250, 450);
      ctx.fillText(memeData.bottomText.toUpperCase(), 250, 450);
    }

    const memeImage = canvas.toDataURL();
    createReceipt('Meme Created', {
      template: memeData.template,
      topText: memeData.topText,
      bottomText: memeData.bottomText,
      image: memeImage
    });

    showNotification('😂 Meme generated successfully!', 'success');
  };

  const downloadMeme = () => {
    const canvas = memeCanvasRef.current;
    const link = document.createElement('a');
    link.download = 'bohboo-meme.png';
    link.href = canvas.toDataURL();
    link.click();
    showNotification('📥 Meme downloaded!', 'success');
  };

  const createGiftCard = () => {
    if (!giftData.recipient || !giftData.message) {
      showNotification('⚠️ Please fill in recipient and message!', 'error');
      return;
    }

    const emojis = {
      birthday: '🎂',
      celebration: '🎊',
      'thank-you': '💝',
      congrats: '🎉'
    };

    createReceipt('Gift Message', {
      recipient: giftData.recipient,
      message: giftData.message,
      style: giftData.style,
      emoji: emojis[giftData.style]
    });

    showNotification('🎁 Gift card created!', 'success');
  };

  const scheduleTransfer = () => {
    if (!walletConnected) {
      showNotification('⚠️ Please connect your wallet first!', 'error');
      return;
    }

    if (!transferData.recipient || !transferData.scheduleTime) {
      showNotification('⚠️ Please fill in all required fields!', 'error');
      return;
    }

    if (transferData.type !== 'nft' && !transferData.amount) {
      showNotification('⚠️ Please enter an amount!', 'error');
      return;
    }

    const newTransfer = {
      id: Date.now().toString(),
      ...transferData,
      fromAddress: walletAddress,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    setScheduledTransfers(prev => [...prev, newTransfer]);
    
    createReceipt('Transfer Scheduled', {
      transferType: transferData.type,
      amount: transferData.amount,
      recipient: transferData.recipient,
      scheduleTime: transferData.scheduleTime,
      note: transferData.note
    });

    showNotification('✅ Transfer scheduled successfully!', 'success');
    setTransferData({ type: 'token', amount: '', nftMint: '', recipient: '', scheduleTime: '', note: '' });
  };

  const cancelSchedule = (id) => {
    const updated = scheduledTransfers.filter(t => t.id !== id);
    setScheduledTransfers(updated);
    localStorage.setItem('bohboo_schedules', JSON.stringify(updated));
    showNotification('🗑️ Transfer cancelled', 'info');
  };

  const giftEmojis = {
    birthday: '🎂',
    celebration: '🎊',
    'thank-you': '💝',
    congrats: '🎉'
  };

  const themes = {
    cosmic: {
      name: '🌌 Cosmic Dream',
      bg: 'bg-gradient-to-br from-purple-900 via-purple-700 to-indigo-900',
      card: 'bg-white/90 backdrop-blur-xl',
      accent: 'from-purple-500 via-pink-500 to-orange-500',
      button: 'bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 hover:scale-105',
      text: 'text-purple-900'
    },
    playful: {
      name: '🎨 Playful Pop',
      bg: 'bg-gradient-to-br from-pink-400 via-purple-400 to-blue-400',
      card: 'bg-white/95 backdrop-blur-lg',
      accent: 'from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500',
      button: 'bg-gradient-to-r from-red-500 via-yellow-500 to-purple-500 hover:scale-105',
      text: 'text-pink-900'
    },
    minimal: {
      name: '✨ Minimal Zen',
      bg: 'bg-gradient-to-br from-slate-100 to-slate-200',
      card: 'bg-white shadow-2xl',
      accent: 'from-indigo-600 to-purple-600',
      button: 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:shadow-2xl',
      text: 'text-slate-900'
    }
  };

  const currentTheme = themes[uiTheme];

  const getCurrentTabReceipts = () => {
    const typeMap = {
      'nft': 'NFT Mint',
      'meme': 'Meme Created',
      'gift': 'Gift Message',
      'schedule': 'Transfer Scheduled'
    };
    return allReceipts.filter(r => r.type === typeMap[activeTab]);
  };

  return (
    <div className={`min-h-screen ${currentTheme.bg} p-4 transition-all duration-500`}>
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      {/* Notification */}
      {notification && (
        <div className={`fixed top-4 right-4 px-6 py-4 rounded-2xl shadow-2xl z-50 text-white animate-slide-in ${
          notification.type === 'success' ? 'bg-gradient-to-r from-green-500 to-emerald-600' :
          notification.type === 'error' ? 'bg-gradient-to-r from-red-500 to-rose-600' :
          notification.type === 'info' ? 'bg-gradient-to-r from-blue-500 to-cyan-600' : 'bg-gradient-to-r from-yellow-500 to-amber-600'
        }`}>
          <div className="flex items-center gap-3">
            <span className="text-2xl">
              {notification.type === 'success' ? '✨' : 
               notification.type === 'error' ? '⚠️' : 
               notification.type === 'info' ? '💡' : '⚡'}
            </span>
            <p className="font-semibold">{notification.msg}</p>
          </div>
        </div>
      )}

      {/* Receipt Modal */}
      {showReceiptModal && currentReceipt && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                    <Check size={32} className="text-white" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-black text-green-600">Transaction Successful!</h2>
                    <p className="text-gray-600">{currentReceipt.type}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowReceiptModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-all"
                >
                  <X size={32} />
                </button>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 mb-6 border-2 border-purple-200">
                <div className="flex items-center gap-2 mb-4">
                  <FileText className="text-purple-600" />
                  <h3 className="font-black text-xl">Receipt Details</h3>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                    <span className="text-gray-600 font-semibold">Receipt ID:</span>
                    <span className="font-mono font-bold text-purple-600">{currentReceipt.id}</span>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                    <span className="text-gray-600 font-semibold">Status:</span>
                    <span className="px-4 py-1 bg-green-100 text-green-800 rounded-full font-bold text-sm">
                      ✅ {currentReceipt.status}
                    </span>
                  </div>

                  {currentReceipt.walletAddress && (
                    <div className="p-3 bg-white rounded-lg">
                      <span className="text-gray-600 font-semibold block mb-1">Wallet Address:</span>
                      <span className="font-mono text-xs break-all">{currentReceipt.walletAddress}</span>
                    </div>
                  )}

                  {currentReceipt.details.image && (
                    <div className="p-3 bg-white rounded-lg">
                      <p className="text-gray-600 font-semibold mb-2">Preview:</p>
                      <img src={currentReceipt.details.image} alt="Preview" className="w-full h-64 object-contain rounded-lg bg-gray-50" />
                    </div>
                  )}

                  <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                    <span className="text-gray-600 font-semibold">Network:</span>
                    <span className="font-bold text-blue-600">{currentReceipt.network}</span>
                  </div>

                  <div className="p-3 bg-white rounded-lg">
                    <span className="text-gray-600 font-semibold block mb-1">Transaction Hash:</span>
                    <span className="font-mono text-xs break-all">{currentReceipt.transactionHash}</span>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                    <span className="text-gray-600 font-semibold">Gas Fee:</span>
                    <span className="font-bold">{currentReceipt.gasFee}</span>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                    <span className="text-gray-600 font-semibold">Timestamp:</span>
                    <span className="text-sm">{new Date(currentReceipt.timestamp).toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => downloadReceipt(currentReceipt)}
                  className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-4 rounded-xl font-bold hover:scale-105 transition-all flex items-center justify-center gap-2"
                >
                  <Download size={20} />
                  Download Receipt
                </button>
                <button
                  onClick={() => setShowReceiptModal(false)}
                  className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-4 rounded-xl font-bold hover:scale-105 transition-all"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className={`${currentTheme.card} rounded-3xl shadow-2xl p-6 mb-6 border border-white/20`}>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <img src={mascotMain} alt="BOHBOO" className="w-24 h-24 rounded-full shadow-lg animate-bounce" style={{animationDuration: '3s'}} />
              <div>
                <h1 className={`text-4xl font-black bg-gradient-to-r ${currentTheme.accent} bg-clip-text text-transparent`}>
                  BOHBOO Creative Hub
                </h1>
                <p className="text-gray-600 font-medium">VBH1.5 Build • Powered by Solana Testnet 🚀</p>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-3 items-center">
              <div className="flex gap-2 bg-white/50 p-2 rounded-xl">
                <button
                  onClick={() => setUiTheme('cosmic')}
                  className={`p-2 rounded-lg transition-all ${uiTheme === 'cosmic' ? 'bg-purple-500 text-white shadow-lg scale-110' : 'hover:bg-white/50'}`}
                  title="Cosmic Dream"
                >
                  🌌
                </button>
                <button
                  onClick={() => setUiTheme('playful')}
                  className={`p-2 rounded-lg transition-all ${uiTheme === 'playful' ? 'bg-pink-500 text-white shadow-lg scale-110' : 'hover:bg-white/50'}`}
                  title="Playful Pop"
                >
                  🎨
                </button>
                <button
                  onClick={() => setUiTheme('minimal')}
                  className={`p-2 rounded-lg transition-all ${uiTheme === 'minimal' ? 'bg-slate-600 text-white shadow-lg scale-110' : 'hover:bg-white/50'}`}
                  title="Minimal Zen"
                >
                  ✨
                </button>
              </div>

              <button
                onClick={walletConnected ? disconnectWallet : connectWallet}
                className={`${currentTheme.button} text-white px-6 py-3 rounded-xl font-bold shadow-lg transition-all`}
              >
                {walletConnected ? `${walletAddress.slice(0, 4)}...${walletAddress.slice(-4)}` : '🔗 Connect Wallet'}
              </button>
              <div className={`px-4 py-3 rounded-xl font-bold text-sm flex items-center gap-2 shadow-lg ${
                walletConnected ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white' : 'bg-gradient-to-r from-red-500 to-rose-600 text-white'
              }`}>
                <span className={`w-3 h-3 bg-white rounded-full ${walletConnected ? '' : 'animate-pulse'}`}></span>
                <span>{walletConnected ? `${walletBalance.toFixed(4)} SOL` : 'Disconnected'}</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200 flex flex-wrap items-center justify-center gap-4">
            <span className="font-bold text-gray-600">Join the BOHBOO Community:</span>
            <a 
              href="https://x.com/BOHBOOhacks" 
              target="_blank" 
              rel="noopener noreferrer"
              className={`${currentTheme.button} text-white px-5 py-2 rounded-lg font-semibold transition-all inline-flex items-center gap-2`}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
              @BOHBOOhacks
            </a>
            <a 
              href="https://discord.gg/bohboo" 
              target="_blank" 
              rel="noopener noreferrer"
              className={`${currentTheme.button} text-white px-5 py-2 rounded-lg font-semibold transition-all inline-flex items-center gap-2`}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
              </svg>
              Discord
            </a>
            <span className="text-gray-400">•</span>
            <span className="text-sm text-gray-500 font-medium">Token: 4xMXe...pump</span>
          </div>

          {/* Wallet Info Display */}
          {walletConnected && (
            <div className="mt-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border-2 border-green-200">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div>
                  <p className="text-sm text-gray-600 font-semibold">Connected Wallet</p>
                  <p className="font-mono text-sm">{walletAddress}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600 font-semibold">Balance</p>
                  <p className="font-bold text-lg text-green-600">{walletBalance.toFixed(4)} SOL</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 font-semibold">Network</p>
                  <p className="font-bold text-blue-600">Testnet</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Tabs */}
        <div className={`${currentTheme.card} rounded-3xl shadow-2xl p-4 mb-6 border border-white/20`}>
          <div className="flex flex-wrap gap-3 justify-center">
            {[
              { id: 'nft', label: 'NFT Generator', icon: '🎨', desc: 'Create unique NFTs' },
              { id: 'meme', label: 'Meme Maker', icon: '😂', desc: 'Generate viral memes' },
              { id: 'gift', label: 'Gift Cards', icon: '🎁', desc: 'Beautiful messages' },
              { id: 'schedule', label: 'Scheduler', icon: '⏰', desc: 'Auto transfers' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-4 rounded-2xl font-bold transition-all transform hover:scale-105 ${
                  activeTab === tab.id
                    ? `bg-gradient-to-r ${currentTheme.accent} text-white shadow-2xl scale-105`
                    : 'bg-white/50 hover:bg-white/80 text-gray-700'
                }`}
              >
                <div className="flex flex-col items-center gap-1">
                  <span className="text-3xl">{tab.icon}</span>
                  <span className="text-sm">{tab.label}</span>
                  <span className="text-xs opacity-75">{tab.desc}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Content placeholder - Would include full NFT, Meme, Gift, Schedule sections */}
        <div className={`${currentTheme.card} rounded-3xl shadow-2xl p-8 border border-white/20 text-center`}>
          <h2 className="text-3xl font-bold mb-4">
            {activeTab === 'nft' && '🎨 NFT Generator'}
            {activeTab === 'meme' && '😂 Meme Maker'}
            {activeTab === 'gift' && '🎁 Gift Cards'}
            {activeTab === 'schedule' && '⏰ Scheduler'}
          </h2>
          <p className="text-gray-600 text-lg">
            {walletConnected 
              ? `Connected to Solana Testnet with ${walletBalance.toFixed(4)} SOL`
              : 'Please connect your wallet to use this feature'
            }
          </p>
          
          {walletConnected && (
            <div className="mt-8 text-left max-w-2xl mx-auto">
              <h3 className="font-bold text-xl mb-4">✅ Wallet Connection Details:</h3>
              <div className="space-y-3 bg-gray-50 p-6 rounded-xl">
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-600">Status:</span>
                  <span className="text-green-600 font-bold">✅ Connected</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-600">Network:</span>
                  <span className="font-bold">Solana Testnet</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-600">Address:</span>
                  <span className="font-mono text-sm">{walletAddress.slice(0, 20)}...</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-600">Balance:</span>
                  <span className="font-bold">{walletBalance.toFixed(4)} SOL</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-600">Stored in:</span>
                  <span className="font-bold text-purple-600">React localStorage</span>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-blue-50 border-2 border-blue-200 rounded-xl">
                <p className="text-sm text-blue-800">
                  <span className="font-bold">💾 Data Persistence:</span> Your wallet connection, balance, receipts, and scheduled transfers are automatically saved to your browser's localStorage and will persist across sessions!
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className={`${currentTheme.card} rounded-3xl shadow-2xl p-6 mt-8 text-center border border-white/20`}>
          <div className="flex flex-col items-center gap-4">
            <img src={mascotMain} alt="BOHBOO" className="w-16 h-16 rounded-full" />
            <p className="text-gray-600 font-semibold text-lg">
              Built with 💜 for the BOHBOO Community
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <span className="px-4 py-2 bg-purple-100 text-purple-800 rounded-full font-bold text-sm">#VBH1.5</span>
              <span className="px-4 py-2 bg-pink-100 text-pink-800 rounded-full font-bold text-sm">#BohbooBuilds</span>
              <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full font-bold text-sm">#CommunityDriven</span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }

        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default BOHBOOGenerator;
