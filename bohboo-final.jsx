import React, { useState, useEffect, useRef } from 'react';
import { Palette, Image, Gift, Clock, Wallet, Check, X, Download, Menu, Home, Sparkles, Zap, Heart } from 'lucide-react';

const BOHBOOGenerator = () => {
  const [uiTheme, setUiTheme] = useState('cosmic');
  const [activeTab, setActiveTab] = useState('nft');
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [nftData, setNftData] = useState({ name: '', description: '', attributes: '', image: null });
  const [memeData, setMemeData] = useState({ template: '', topText: '', bottomText: '', textSize: 40, customImage: null });
  const [giftData, setGiftData] = useState({ recipient: '', message: '', style: 'birthday' });
  const [transferData, setTransferData] = useState({ type: 'token', amount: '', nftMint: '', recipient: '', scheduleTime: '', note: '' });
  const [scheduledTransfers, setScheduledTransfers] = useState([]);
  const [notification, setNotification] = useState(null);
  
  const memeCanvasRef = useRef(null);
  const fileInputRef = useRef(null);
  const customMemeRef = useRef(null);

  // BOHBOO mascot images
  const mascotMain = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Cdefs%3E%3CradialGradient id='grad1'%3E%3Cstop offset='0%25' style='stop-color:%23FF8C42;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%23FF6B35;stop-opacity:1' /%3E%3C/radialGradient%3E%3C/defs%3E%3Ccircle cx='100' cy='100' r='90' fill='url(%23grad1)'/%3E%3Cellipse cx='70' cy='60' rx='8' ry='12' fill='white'/%3E%3Cellipse cx='70' cy='60' rx='12' ry='16' fill='none' stroke='%23333' stroke-width='2'/%3E%3Ccircle cx='70' cy='60' r='6' fill='%23333'/%3E%3Ccircle cx='68' cy='58' r='2' fill='white'/%3E%3Cellipse cx='130' cy='60' rx='8' ry='12' fill='white'/%3E%3Cellipse cx='130' cy='60' rx='12' ry='16' fill='none' stroke='%23333' stroke-width='2'/%3E%3Ccircle cx='130' cy='60' r='6' fill='%23333'/%3E%3Ccircle cx='128' cy='58' r='2' fill='white'/%3E%3Cellipse cx='100' cy='80' rx='8' ry='10' fill='%23333'/%3E%3Cpath d='M 70 100 Q 100 120 130 100' stroke='%23333' stroke-width='4' fill='none' stroke-linecap='round'/%3E%3Ccircle cx='60' cy='95' r='12' fill='%23FFB6C1'/%3E%3Ccircle cx='140' cy='95' r='12' fill='%23FFB6C1'/%3E%3Cellipse cx='50' cy='40' rx='15' ry='25' fill='%23FF8C42' transform='rotate(-20 50 40)'/%3E%3Cellipse cx='150' cy='40' rx='15' ry='25' fill='%23FF8C42' transform='rotate(20 150 40)'/%3E%3Cpath d='M 85 120 L 90 135 L 95 120 L 100 135 L 105 120 L 110 135 L 115 120' stroke='%23FF0000' stroke-width='3' fill='none'/%3E%3Cpath d='M 85 120 L 90 135 L 95 120' fill='%23FF0000'/%3E%3Cpath d='M 95 120 L 100 135 L 105 120' fill='%23FFA500'/%3E%3Cpath d='M 105 120 L 110 135 L 115 120' fill='%23FFFF00'/%3E%3Cpath d='M 90 135 L 95 120 L 100 135' fill='%2300FF00'/%3E%3Cpath d='M 100 135 L 105 120 L 110 135' fill='%230000FF'/%3E%3Ccircle cx='55' cy='45' r='3' fill='white'/%3E%3Ccircle cx='60' cy='38' r='3' fill='white'/%3E%3Ccircle cx='65' cy='42' r='3' fill='white'/%3E%3Ccircle cx='135' cy='45' r='3' fill='white'/%3E%3Ccircle cx='140' cy='38' r='3' fill='white'/%3E%3Ccircle cx='145' cy='42' r='3' fill='white'/%3E%3C/svg%3E";

  const mascotWithGhost = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 200'%3E%3Cdefs%3E%3CradialGradient id='grad1'%3E%3Cstop offset='0%25' style='stop-color:%23FF8C42;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%23FF6B35;stop-opacity:1' /%3E%3C/radialGradient%3E%3CradialGradient id='grad2'%3E%3Cstop offset='0%25' style='stop-color:%2380FFD4;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%2360E8C0;stop-opacity:1' /%3E%3C/radialGradient%3E%3C/defs%3E%3Ccircle cx='100' cy='100' r='70' fill='url(%23grad1)'/%3E%3Cellipse cx='80' cy='85' rx='6' ry='10' fill='white'/%3E%3Cellipse cx='80' cy='85' rx='10' ry='13' fill='none' stroke='%23333' stroke-width='2'/%3E%3Ccircle cx='80' cy='85' r='5' fill='%23333'/%3E%3Ccircle cx='78' cy='83' r='2' fill='white'/%3E%3Cellipse cx='120' cy='85' rx='6' ry='10' fill='white'/%3E%3Cellipse cx='120' cy='85' rx='10' ry='13' fill='none' stroke='%23333' stroke-width='2'/%3E%3Ccircle cx='120' cy='85' r='5' fill='%23333'/%3E%3Ccircle cx='118' cy='83' r='2' fill='white'/%3E%3Cellipse cx='100' cy='95' rx='6' ry='8' fill='%23333'/%3E%3Cpath d='M 80 110 Q 100 125 120 110' stroke='%23333' stroke-width='3' fill='none' stroke-linecap='round'/%3E%3Ccircle cx='70' cy='105' r='10' fill='%23FFB6C1'/%3E%3Ccircle cx='130' cy='105' r='10' fill='%23FFB6C1'/%3E%3Cellipse cx='60' cy='60' rx='12' ry='20' fill='%23FF8C42' transform='rotate(-20 60 60)'/%3E%3Cellipse cx='140' cy='60' rx='12' ry='20' fill='%23FF8C42' transform='rotate(20 140 60)'/%3E%3Cpath d='M 85 125 L 88 135 L 91 125 L 94 135 L 97 125 L 100 135 L 103 125 L 106 135 L 109 125 L 112 135 L 115 125' stroke='%23FF0000' stroke-width='2' fill='none'/%3E%3Cpath d='M 85 125 L 88 135 L 91 125' fill='%23FF0000'/%3E%3Cpath d='M 91 125 L 94 135 L 97 125' fill='%23FFA500'/%3E%3Cpath d='M 97 125 L 100 135 L 103 125' fill='%23FFFF00'/%3E%3Cpath d='M 103 125 L 106 135 L 109 125' fill='%2300FF00'/%3E%3Cpath d='M 109 125 L 112 135 L 115 125' fill='%230000FF'/%3E%3Cellipse cx='280' cy='120' rx='50' ry='60' fill='url(%23grad2)'/%3E%3Cpath d='M 250 180 Q 255 175 260 180 Q 265 175 270 180 Q 275 175 280 180 Q 285 175 290 180 Q 295 175 300 180 Q 305 175 310 180' fill='url(%23grad2)'/%3E%3Ccircle cx='265' cy='105' r='8' fill='%23333'/%3E%3Ccircle cx='263' cy='103' r='3' fill='white'/%3E%3Ccircle cx='295' cy='105' r='8' fill='%23333'/%3E%3Ccircle cx='293' cy='103' r='3' fill='white'/%3E%3Cpath d='M 270 125 Q 280 132 290 125' stroke='%23333' stroke-width='2' fill='none' stroke-linecap='round'/%3E%3Ccircle cx='260' cy='115' r='6' fill='%23FFB6C1'/%3E%3Ccircle cx='300' cy='115' r='6' fill='%23FFB6C1'/%3E%3Cpath d='M 240 70 Q 245 60 250 70' fill='%2380FFD4'/%3E%3Cpath d='M 310 70 Q 305 60 300 70' fill='%2380FFD4'/%3E%3Cellipse cx='265' cy='85' rx='3' ry='5' fill='%23333' transform='rotate(-10 265 85)'/%3E%3Cellipse cx='295' cy='85' rx='3' ry='5' fill='%23333' transform='rotate(10 295 85)'/%3E%3Cpath d='M 230 90 L 240 85 L 235 95 Z' fill='%23FFD700'/%3E%3Cpath d='M 245 75 L 253 72 L 248 82 Z' fill='%23FFD700'/%3E%3Cpath d='M 320 90 L 310 85 L 315 95 Z' fill='%23FFD700'/%3E%3Cpath d='M 235 110 Q 245 115 255 110' stroke='%23FFA500' stroke-width='2' fill='none'/%3E%3Cpath d='M 295 110 Q 305 115 315 110' stroke='%23FFA500' stroke-width='2' fill='none'/%3E%3Ccircle cx='280' cy='100' r='4' fill='%23FF69B4' opacity='0.6'/%3E%3Ccircle cx='270' cy='135' r='3' fill='%2300CED1' opacity='0.5'/%3E%3Ccircle cx='290' cy='135' r='3' fill='%2300CED1' opacity='0.5'/%3E%3Cellipse cx='250' cy='50' rx='8' ry='12' fill='%2380FFD4' opacity='0.7'/%3E%3Cellipse cx='310' cy='50' rx='8' ry='12' fill='%2380FFD4' opacity='0.7'/%3E%3C/svg%3E";

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

  useEffect(() => {
    const saved = localStorage.getItem('bohboo_schedules');
    if (saved) {
      setScheduledTransfers(JSON.parse(saved));
    }
    
    const interval = setInterval(checkScheduledTransfers, 30000);
    return () => clearInterval(interval);
  }, []);

  const checkScheduledTransfers = () => {
    const now = new Date();
    const updated = scheduledTransfers.map(transfer => {
      if (transfer.status === 'pending' && new Date(transfer.scheduleTime) <= now) {
        showNotification('✨ Executing scheduled transfer...', 'info');
        return { ...transfer, status: 'completed' };
      }
      return transfer;
    });
    setScheduledTransfers(updated);
    localStorage.setItem('bohboo_schedules', JSON.stringify(updated));
  };

  const showNotification = (message, type = 'info') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  const connectWallet = async () => {
    if (typeof window.solana !== 'undefined' && window.solana.isPhantom) {
      try {
        const resp = await window.solana.connect();
        const address = resp.publicKey.toString();
        setWalletAddress(address);
        setWalletConnected(true);
        showNotification('🎉 Wallet connected successfully!', 'success');
      } catch (err) {
        showNotification('❌ Failed to connect wallet', 'error');
      }
    } else {
      showNotification('⚠️ Please install Phantom wallet!', 'error');
    }
  };

  const disconnectWallet = async () => {
    if (window.solana) {
      await window.solana.disconnect();
      setWalletConnected(false);
      setWalletAddress('');
      showNotification('👋 Wallet disconnected', 'info');
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
    showNotification('🎨 NFT created successfully! (Demo mode)', 'success');
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
      
      // Add template emoji
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
      const words = memeData.topText.toUpperCase().split(' ');
      const lines = [];
      let currentLine = '';
      
      words.forEach(word => {
        const testLine = currentLine + (currentLine ? ' ' : '') + word;
        const metrics = ctx.measureText(testLine);
        if (metrics.width > 450 && currentLine) {
          lines.push(currentLine);
          currentLine = word;
        } else {
          currentLine = testLine;
        }
      });
      if (currentLine) lines.push(currentLine);
      
      lines.forEach((line, i) => {
        const y = 60 + (i * (parseInt(memeData.textSize) + 10));
        ctx.strokeText(line, 250, y);
        ctx.fillText(line, 250, y);
      });
    }

    if (memeData.bottomText) {
      const words = memeData.bottomText.toUpperCase().split(' ');
      const lines = [];
      let currentLine = '';
      
      words.forEach(word => {
        const testLine = currentLine + (currentLine ? ' ' : '') + word;
        const metrics = ctx.measureText(testLine);
        if (metrics.width > 450 && currentLine) {
          lines.push(currentLine);
          currentLine = word;
        } else {
          currentLine = testLine;
        }
      });
      if (currentLine) lines.push(currentLine);
      
      const startY = 470 - (lines.length - 1) * (parseInt(memeData.textSize) + 10);
      lines.forEach((line, i) => {
        const y = startY + (i * (parseInt(memeData.textSize) + 10));
        ctx.strokeText(line, 250, y);
        ctx.fillText(line, 250, y);
      });
    }

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

    const updated = [...scheduledTransfers, newTransfer];
    setScheduledTransfers(updated);
    localStorage.setItem('bohboo_schedules', JSON.stringify(updated));
    
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

  return (
    <div className={`min-h-screen ${currentTheme.bg} p-4 transition-all duration-500`}>
      {/* Animated Background Elements */}
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
            <p className="font-semibold">{notification.message}</p>
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
                <p className="text-gray-600 font-medium">VBH1.5 Build • Powered by Solana 🚀</p>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-3 items-center">
              {/* Theme Switcher */}
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
                <span>{walletConnected ? 'Connected' : 'Disconnected'}</span>
              </div>
            </div>
          </div>

          {/* Social Media Links */}
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

        {/* Content Sections */}
        <div className="space-y-6">
          {/* NFT Generator */}
          {activeTab === 'nft' && (
            <div className={`${currentTheme.card} rounded-3xl shadow-2xl p-8 border border-white/20 animate-fade-in`}>
              <div className="flex items-center gap-3 mb-6">
                <span className="text-5xl">🎨</span>
                <h2 className={`text-3xl font-black bg-gradient-to-r ${currentTheme.accent} bg-clip-text text-transparent`}>
                  NFT Generator
                </h2>
              </div>

              {/* Preset BOHBOO NFTs */}
              <div className="mb-8">
                <label className="block mb-4 font-bold text-xl">Choose BOHBOO Character NFT:</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  <div
                    onClick={() => selectPresetNFT(mascotMain)}
                    className={`cursor-pointer border-4 rounded-2xl p-4 transition-all transform hover:scale-105 ${
                      nftData.image === mascotMain ? 'border-purple-500 shadow-2xl scale-105' : 'border-gray-300'
                    }`}
                  >
                    <img src={mascotMain} alt="BOHBOO Deer" className="w-full h-48 object-contain rounded-xl mb-3" />
                    <p className="text-center font-bold">BOHBOO Deer</p>
                    <p className="text-center text-sm text-gray-500">Classic Mascot</p>
                  </div>
                  
                  <div
                    onClick={() => selectPresetNFT(mascotWithGhost)}
                    className={`cursor-pointer border-4 rounded-2xl p-4 transition-all transform hover:scale-105 ${
                      nftData.image === mascotWithGhost ? 'border-purple-500 shadow-2xl scale-105' : 'border-gray-300'
                    }`}
                  >
                    <img src={mascotWithGhost} alt="BOHBOO Friends" className="w-full h-48 object-contain rounded-xl mb-3" />
                    <p className="text-center font-bold">BOHBOO Friends</p>
                    <p className="text-center text-sm text-gray-500">Deer + Ghost Duo</p>
                  </div>
                  
                  <div className="border-4 border-dashed border-gray-300 rounded-2xl p-4 flex flex-col items-center justify-center cursor-pointer hover:border-purple-500 transition-all"
                       onClick={() => fileInputRef.current?.click()}>
                    <Upload size={48} className="text-gray-400 mb-2" />
                    <p className="text-center font-bold">Upload Custom</p>
                    <p className="text-center text-sm text-gray-500">Your own art</p>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <label className="block font-bold text-lg">Or Upload Your Own Art</label>
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    onChange={handleNftImageUpload}
                    className="hidden"
                  />
                  {nftData.image && (
                    <div className="relative group">
                      <img src={nftData.image} alt="NFT Preview" className="w-full h-80 object-contain rounded-2xl shadow-xl bg-gradient-to-br from-purple-100 to-pink-100 p-4" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-all flex items-end p-4">
                        <p className="text-white font-bold">Your NFT Preview</p>
                      </div>
                    </div>
                  )}
                </div>
                <div className="space-y-5">
                  <div>
                    <label className="block mb-2 font-bold text-lg">NFT Name</label>
                    <input
                      type="text"
                      value={nftData.name}
                      onChange={(e) => setNftData({ ...nftData, name: e.target.value })}
                      placeholder="BOHBOO Genesis #001"
                      className="w-full p-4 border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-200 transition-all text-lg"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 font-bold text-lg">Description</label>
                    <textarea
                      value={nftData.description}
                      onChange={(e) => setNftData({ ...nftData, description: e.target.value })}
                      rows={4}
                      placeholder="Official BOHBOO Collection NFT. Rare and unique!"
                      className="w-full p-4 border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-200 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 font-bold text-lg">Attributes</label>
                    <input
                      type="text"
                      value={nftData.attributes}
                      onChange={(e) => setNftData({ ...nftData, attributes: e.target.value })}
                      placeholder="Rare, Rainbow Bow, Animated"
                      className="w-full p-4 border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-200 transition-all"
                    />
                  </div>
                  <button
                    onClick={mintNFT}
                    className={`w-full ${currentTheme.button} text-white px-8 py-5 rounded-2xl font-black text-xl shadow-2xl transition-all`}
                  >
                    ✨ Mint NFT Now
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Meme Generator */}
          {activeTab === 'meme' && (
            <div className={`${currentTheme.card} rounded-3xl shadow-2xl p-8 border border-white/20 animate-fade-in`}>
              <div className="flex items-center gap-3 mb-6">
                <span className="text-5xl">😂</span>
                <h2 className={`text-3xl font-black bg-gradient-to-r ${currentTheme.accent} bg-clip-text text-transparent`}>
                  Meme Generator
                </h2>
              </div>
              <div className="mb-8">
                <label className="block mb-4 font-bold text-xl">Choose Your Meme Template:</label>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {memeTemplates.map(template => (
                    <div
                      key={template.id}
                      onClick={() => selectMemeTemplate(template)}
                      className={`cursor-pointer border-4 rounded-2xl p-3 transition-all transform hover:scale-105 ${
                        memeData.template === template.id ? 'border-purple-500 shadow-2xl scale-105' : 'border-transparent'
                      }`}
                    >
                      <div className={`bg-gradient-to-br ${template.gradient} h-32 rounded-xl flex flex-col items-center justify-center text-white font-bold text-center shadow-lg p-2`}>
                        <span className="text-4xl mb-1">{template.emoji}</span>
                        <span className="text-xs">{template.name}</span>
                      </div>
                    </div>
                  ))}
                  
                  <div
                    onClick={() => customMemeRef.current?.click()}
                    className="cursor-pointer border-4 border-dashed border-gray-300 rounded-2xl p-3 transition-all transform hover:scale-105 hover:border-purple-500"
                  >
                    <div className="bg-gray-100 h-32 rounded-xl flex flex-col items-center justify-center text-gray-600 font-bold text-center">
                      <Upload size={32} className="mb-1" />
                      <span className="text-xs">Upload Custom</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <input
                type="file"
                ref={customMemeRef}
                accept="image/*"
                onChange={handleCustomMemeUpload}
                className="hidden"
              />
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <canvas ref={memeCanvasRef} width="500" height="500" className="w-full border-4 border-gray-300 rounded-2xl shadow-xl" />
                </div>
                <div className="space-y-5">
                  <div>
                    <label className="block mb-2 font-bold text-lg">Top Text</label>
                    <input
                      type="text"
                      value={memeData.topText}
                      onChange={(e) => setMemeData({ ...memeData, topText: e.target.value })}
                      placeholder="WHEN YOU..."
                      className="w-full p-4 border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-200 transition-all text-lg font-bold"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 font-bold text-lg">Bottom Text</label>
                    <input
                      type="text"
                      value={memeData.bottomText}
                      onChange={(e) => setMemeData({ ...memeData, bottomText: e.target.value })}
                      placeholder="BOHBOO TO THE MOON"
                      className="w-full p-4 border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-200 transition-all text-lg font-bold"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 font-bold text-lg">Text Size: {memeData.textSize}px</label>
                    <input
                      type="range"
                      min="20"
                      max="60"
                      value={memeData.textSize}
                      onChange={(e) => setMemeData({ ...memeData, textSize: e.target.value })}
                      className="w-full h-3 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                  <button
                    onClick={generateMeme}
                    className={`w-full ${currentTheme.button} text-white px-8 py-5 rounded-2xl font-black text-xl shadow-2xl transition-all`}
                  >
                    😂 Generate Meme
                  </button>
                  <button
                    onClick={downloadMeme}
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-5 rounded-2xl font-black text-xl shadow-2xl transition-all hover:scale-105"
                  >
                    <Download className="inline mr-2" size={24} />
                    Download Meme
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Gift Messages - Same as before */}
          {activeTab === 'gift' && (
            <div className={`${currentTheme.card} rounded-3xl shadow-2xl p-8 border border-white/20 animate-fade-in`}>
              <div className="flex items-center gap-3 mb-6">
                <span className="text-5xl">🎁</span>
                <h2 className={`text-3xl font-black bg-gradient-to-r ${currentTheme.accent} bg-clip-text text-transparent`}>
                  Gift Message Creator
                </h2>
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-5">
                  <div>
                    <label className="block mb-2 font-bold text-lg">Recipient Name</label>
                    <input
                      type="text"
                      value={giftData.recipient}
                      onChange={(e) => setGiftData({ ...giftData, recipient: e.target.value })}
                      placeholder="John Doe"
                      className="w-full p-4 border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-200 transition-all text-lg"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 font-bold text-lg">Your Message</label>
                    <textarea
                      value={giftData.message}
                      onChange={(e) => setGiftData({ ...giftData, message: e.target.value })}
                      rows={5}
                      placeholder="Happy Birthday! May all your dreams come true! 🎉"
                      className="w-full p-4 border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-200 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 font-bold text-lg">Card Style</label>
                    <select
                      value={giftData.style}
                      onChange={(e) => setGiftData({ ...giftData, style: e.target.value })}
                      className="w-full p-4 border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-200 transition-all text-lg"
                    >
                      <option value="birthday">🎂 Birthday</option>
                      <option value="celebration">🎊 Celebration</option>
                      <option value="thank-you">💝 Thank You</option>
                      <option value="congrats">🎉 Congratulations</option>
                    </select>
                  </div>
                  <button
                    onClick={() => showNotification('🎁 Gift card created! Screenshot to share!', 'success')}
                    className={`w-full ${currentTheme.button} text-white px-8 py-5 rounded-2xl font-black text-xl shadow-2xl transition-all`}
                  >
                    🎁 Create Gift Card
                  </button>
                </div>
                <div className="space-y-4">
                  <label className="block font-bold text-lg">Live Preview</label>
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-indigo-800 rounded-3xl blur-xl opacity-50"></div>
                    <div className="relative bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 rounded-3xl p-12 text-white text-center min-h-[400px] flex flex-col justify-center shadow-2xl transform hover:scale-105 transition-all">
                      <div className="space-y-6">
                        <p className="text-8xl animate-bounce">{giftEmojis[giftData.style]}</p>
                        <h3 className="text-3xl font-black">Dear {giftData.recipient || 'Someone Special'}</h3>
                        <p className="text-xl leading-relaxed">{giftData.message || 'Your heartfelt message here...'}</p>
                        <div className="pt-6 border-t border-white/30">
                          <p className="text-sm opacity-90 font-semibold">Powered by BOHBOO 🚀</p>
                          <p className="text-xs opacity-75">Share the love on Solana</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Transfer Scheduler - Same as before */}
          {activeTab === 'schedule' && (
            <>
              <div className={`${currentTheme.card} rounded-3xl shadow-2xl p-8 mb-6 border border-white/20 animate-fade-in`}>
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-5xl">⏰</span>
                  <h2 className={`text-3xl font-black bg-gradient-to-r ${currentTheme.accent} bg-clip-text text-transparent`}>
                    Transfer Scheduler
                  </h2>
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-5">
                    <div>
                      <label className="block mb-2 font-bold text-lg">Transfer Type</label>
                      <select
                        value={transferData.type}
                        onChange={(e) => setTransferData({ ...transferData, type: e.target.value })}
                        className="w-full p-4 border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-200 transition-all text-lg"
                      >
                        <option value="token">💎 BOHBOO Token</option>
                        <option value="nft">🎨 NFT</option>
                        <option value="sol">⚡ SOL</option>
                      </select>
                    </div>
                    {transferData.type !== 'nft' ? (
                      <div>
                        <label className="block mb-2 font-bold text-lg">Amount</label>
                        <input
                          type="number"
                          value={transferData.amount}
                          onChange={(e) => setTransferData({ ...transferData, amount: e.target.value })}
                          placeholder="100"
                          className="w-full p-4 border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-200 transition-all text-lg"
                        />
                      </div>
                    ) : (
                      <div>
                        <label className="block mb-2 font-bold text-lg">NFT Mint Address</label>
                        <input
                          type="text"
                          value={transferData.nftMint}
                          onChange={(e) => setTransferData({ ...transferData, nftMint: e.target.value })}
                          placeholder="Enter NFT mint address"
                          className="w-full p-4 border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-200 transition-all"
                        />
                      </div>
                    )}
                    <div>
                      <label className="block mb-2 font-bold text-lg">Recipient Address</label>
                      <input
                        type="text"
                        value={transferData.recipient}
                        onChange={(e) => setTransferData({ ...transferData, recipient: e.target.value })}
                        placeholder="Solana wallet address"
                        className="w-full p-4 border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-200 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block mb-2 font-bold text-lg">Schedule Date & Time</label>
                      <input
                        type="datetime-local"
                        value={transferData.scheduleTime}
                        onChange={(e) => setTransferData({ ...transferData, scheduleTime: e.target.value })}
                        className="w-full p-4 border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-200 transition-all text-lg"
                      />
                    </div>
                    <div>
                      <label className="block mb-2 font-bold text-lg">Note (Optional)</label>
                      <input
                        type="text"
                        value={transferData.note}
                        onChange={(e) => setTransferData({ ...transferData, note: e.target.value })}
                        placeholder="Birthday gift, Monthly payment, etc."
                        className="w-full p-4 border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-200 transition-all"
                      />
                    </div>
                    <button
                      onClick={scheduleTransfer}
                      className={`w-full ${currentTheme.button} text-white px-8 py-5 rounded-2xl font-black text-xl shadow-2xl transition-all`}
                    >
                      ⏰ Schedule Transfer
                    </button>
                  </div>
                  <div className="space-y-6">
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl border-2 border-blue-200">
                      <h4 className="font-black text-xl mb-4 text-blue-900">ℹ️ How It Works</h4>
                      <ol className="space-y-3 text-blue-800">
                        {[
                          'Connect your Solana wallet',
                          'Enter transfer details',
                          'Set your schedule time',
                          'Sign the transaction',
                          'Auto-execute at scheduled time'
                        ].map((step, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <span className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
                              {i + 1}
                            </span>
                            <span className="pt-1">{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                    <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-6 rounded-2xl border-l-4 border-yellow-500">
                      <p className="font-bold text-yellow-900 mb-2">⚠️ Important</p>
                      <p className="text-yellow-800">Ensure your wallet has sufficient balance at the scheduled time. Transactions execute automatically!</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Scheduled Transfers List */}
              <div className={`${currentTheme.card} rounded-3xl shadow-2xl p-8 border border-white/20`}>
                <h3 className="text-2xl font-black mb-6">📋 Your Scheduled Transfers</h3>
                <div className="space-y-4">
                  {scheduledTransfers.filter(t => t.fromAddress === walletAddress).length === 0 ? (
                    <div className="text-center py-16">
                      <p className="text-6xl mb-4">📭</p>
                      <p className="text-gray-400 text-xl font-semibold">No scheduled transfers yet</p>
                      <p className="text-gray-400">Create your first scheduled transfer above!</p>
                    </div>
                  ) : (
                    scheduledTransfers.filter(t => t.fromAddress === walletAddress).map(transfer => {
                      const statusConfig = {
                        pending: { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: '⏳' },
                        executing: { bg: 'bg-blue-100', text: 'text-blue-800', icon: '⚡' },
                        completed: { bg: 'bg-green-100', text: 'text-green-800', icon: '✅' },
                        failed: { bg: 'bg-red-100', text: 'text-red-800', icon: '❌' }
                      };

                      const config = statusConfig[transfer.status];

                      return (
                        <div key={transfer.id} className="bg-gradient-to-r from-purple-50 to-indigo-50 border-l-4 border-purple-500 p-6 rounded-2xl hover:shadow-xl transition-all">
                          <div className="flex justify-between items-start">
                            <div className="flex-1 space-y-2">
                              <div className="flex items-center gap-3">
                                <span className="text-2xl font-black">{transfer.type.toUpperCase()}</span>
                                <span className={`px-4 py-2 rounded-full text-sm font-bold ${config.bg} ${config.text}`}>
                                  {config.icon} {transfer.status.toUpperCase()}
                                </span>
                              </div>
                              <p className="text-lg font-semibold text-gray-700">
                                {transfer.type === 'nft' ? `NFT: ${transfer.nftMint?.slice(0, 12)}...` : `Amount: ${transfer.amount}`}
                              </p>
                              <p className="text-sm text-gray-600">
                                <span className="font-semibold">To:</span> {transfer.recipient.slice(0, 12)}...{transfer.recipient.slice(-12)}
                              </p>
                              <p className="text-sm text-gray-600">
                                <span className="font-semibold">Scheduled:</span> {new Date(transfer.scheduleTime).toLocaleString()}
                              </p>
                              {transfer.note && (
                                <p className="text-sm text-gray-500 italic bg-white/50 p-2 rounded">💬 {transfer.note}</p>
                              )}
                            </div>
                            <button
                              onClick={() => cancelSchedule(transfer.id)}
                              className="ml-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl font-bold transition-all hover:scale-105"
                            >
                              🗑️ Cancel
                            </button>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </>
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

// Missing Upload import
const Upload = ({ size, className }) => (
  <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/>
  </svg>
);

export default BOHBOOGenerator;
