import React from 'react';
import './App.css'; 

// 🌟 قائمة بالعناصر القابلة للشراء (مع إضافة مسارات الصور placeholder)
const purchasableItems = [
    { 
        id: 'genie-gold', 
        name: 'زي الجني الذهبي', 
        cost: 150, 
        type: 'genie_skin', 
        icon: '👑', 
        imagePath: './genie-gold.png' // مسار داخل مجلد Public/assets
    },
    { 
        id: 'genie-pharaoh', 
        name: 'زي جني الفرعون', 
        cost: 250, 
        type: 'genie_skin', 
        icon: '🏛️', 
        imagePath: './Pharos.png' // مسار داخل مجلد Public/assets
    },
    { 
        id: 'bg-space', 
        name: 'خلفية الفضاء الملونة', 
        cost: 100, 
        type: 'background', 
        icon: '🌌', 
        imagePath: '/genie-space.png' // مسار داخل مجلد Public/assets
    },
    { 
        id: 'bg-oasis', 
        name: 'خلفية واحة الجني', 
        cost: 100, 
        type: 'background', 
        icon: '🌴', 
        imagePath: './oasis.png' // مسار داخل مجلد Public/assets
    },
    { 
        id: 'game-puzzle', 
        name: 'لعبة الألغاز الذهبية', 
        cost: 300, 
        type: 'minigame', 
        icon: '🧩', 
        imagePath: './game.png' // مسار داخل مجلد Public/assets
    },
    { 
        id: 'cert-diamond', 
        name: 'شهادة الإنجاز الماسي', 
        cost: 500, 
        type: 'certificate', 
        icon: '🏅', 
        imagePath: './ultimate badge.png' // مسار داخل مجلد Public/assets
    },
];

const PointsTab = ({ totalPoints, unlockedItems, onPurchaseItem, onBackToForm }) => {
    return (
        <div className="points-container" dir="rtl">
            <h1 className="points-title">
                <span role="img" aria-label="gem">💎</span> مغارة الجني (<span className="points-total">{totalPoints}</span> نقطة)
            </h1>
            <p className="points-description">
                اجمع النجوم في دروسك واصرفها لفتح كنوز سحرية لتطبيقك!
            </p>

            <div className="items-grid">
                {purchasableItems.map(item => {
                    const isUnlocked = unlockedItems.includes(item.id);
                    const canAfford = totalPoints >= item.cost;
                    
                    return (
                        <div key={item.id} className="item-card">
                            
                            <div className="item-image-wrapper">
                                <img 
                                    src={item.imagePath} 
                                    alt={item.name} 
                                    className={`item-image ${isUnlocked ? 'unlocked-glow' : 'locked-overlay'}`}
                                />
                                <span className="item-icon-label">{item.icon}</span> 
                            </div>

                            <h3>{item.name}</h3>
                            <p className="item-type">({item.type.replace('-', ' ')})</p>
                            
                            {isUnlocked ? (
                                <button className="item-button unlocked" disabled>
                                    تم الفتح ✅
                                </button>
                            ) : (
                                <button
                                    className={`item-button ${canAfford ? 'buy-ready' : 'buy-disabled'}`}
                                    onClick={() => onPurchaseItem(item.cost, item.id)}
                                    disabled={!canAfford}
                                >
                                    {canAfford ? `افتح بـ ${item.cost} نقطة` : `تحتاج ${item.cost - totalPoints} نقطة`}
                                </button>
                            )}
                        </div>
                    );
                })}
            </div>
            
            <button onClick={onBackToForm} className="back-button">
                العودة لبدء المغامرات
            </button>
        </div>
    );
};

export default PointsTab;
