// Netix Liu Business Website JavaScript

class NetixWebsite {
    constructor() {
        this.init();
    }

    init() {
        this.setupNavigation();
        this.setupScrollAnimations();
        this.setupBackToTop();
        this.setupServiceCards();
        this.setupContactInteractions();
        this.setupExpertiseButtons();
    }

    // Navigation functionality
    setupNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        const sections = document.querySelectorAll('section[id]');

        // Smooth scroll for navigation links
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Update active navigation item on scroll
        window.addEventListener('scroll', () => {
            this.updateActiveNavItem(sections, navLinks);
        });
    }

    updateActiveNavItem(sections, navLinks) {
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // 核心專長按鈕互動
    setupExpertiseButtons() {
        const expertiseButtons = document.querySelectorAll('.expertise-btn');
        
        expertiseButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const expertise = button.textContent.trim();
                this.showExpertiseDetails(expertise);
            });
        });
    }

    showExpertiseDetails(expertise) {
        const expertiseInfo = {
            '企業策略': '協助企業制定長期發展策略，分析市場趨勢與競爭環境，建立可持續的競爭優勢。',
            '數位轉型': '引導企業進行數位化轉型，導入新技術與系統，優化工作流程與客戶體驗。',
            '營運優化': '深入分析企業營運流程，識別改善機會，設計更有效率的作業模式。',
            '專案管理': '提供專業的專案管理服務，確保專案按時按質完成，有效控制風險與成本。'
        };

        const description = expertiseInfo[expertise] || '專業的商務諮詢服務，協助企業達成目標。';

        // Create and show expertise details modal
        const modal = document.createElement('dialog');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-box">
                <h3 class="font-bold text-lg mb-4">
                    <i class="fas fa-star text-primary mr-2"></i>
                    ${expertise}
                </h3>
                <p class="py-4 text-base-content/80">
                    ${description}
                </p>
                <div class="modal-action">
                    <form method="dialog">
                        <button class="btn btn-primary">了解</button>
                    </form>
                    <button class="btn btn-outline" onclick="document.getElementById('contact').scrollIntoView({behavior: 'smooth'}); this.closest('dialog').close();">
                        立即諮詢
                    </button>
                </div>
            </div>
            <form method="dialog" class="modal-backdrop">
                <button>close</button>
            </form>
        `;
        
        document.body.appendChild(modal);
        modal.showModal();
        
        // Remove modal after closing
        modal.addEventListener('close', () => {
            setTimeout(() => modal.remove(), 300);
        });
    }

    // Contact interactions - 簡化的聯絡資訊互動
    setupContactInteractions() {
        const contactItems = document.querySelectorAll('.contact-info-item');
        
        contactItems.forEach(item => {
            item.style.cursor = 'pointer';
            item.title = '點擊複製聯絡資訊';
            
            item.addEventListener('click', (e) => {
                const itemText = item.textContent;
                
                if (itemText.includes('netix.liu@business.com')) {
                    this.handleEmailClick();
                } else if (itemText.includes('+886-2-1234-5678')) {
                    this.handlePhoneClick();
                } else if (itemText.includes('台北市信義區信義路五段7號')) {
                    this.handleAddressClick();
                }
            });
        });
    }

    handleEmailClick() {
        const email = 'netix.liu@business.com';
        if (navigator.clipboard) {
            navigator.clipboard.writeText(email).then(() => {
                this.showToast('電子郵件地址已複製到剪貼簿', 'success');
            }).catch(() => {
                window.location.href = `mailto:${email}`;
            });
        } else {
            window.location.href = `mailto:${email}`;
        }
    }

    handlePhoneClick() {
        const phone = '+886-2-1234-5678';
        if (navigator.clipboard) {
            navigator.clipboard.writeText(phone).then(() => {
                this.showToast('電話號碼已複製到剪貼簿', 'success');
            }).catch(() => {
                window.location.href = `tel:${phone}`;
            });
        } else {
            window.location.href = `tel:${phone}`;
        }
    }

    handleAddressClick() {
        const address = '台北市信義區信義路五段7號';
        if (navigator.clipboard) {
            navigator.clipboard.writeText(address).then(() => {
                this.showToast('地址已複製到剪貼簿', 'success');
            }).catch(() => {
                const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
                window.open(googleMapsUrl, '_blank');
            });
        } else {
            const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
            window.open(googleMapsUrl, '_blank');
        }
    }

    showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = 'toast toast-top toast-end z-50';
        
        const alertClass = type === 'success' ? 'alert-success' : 
                          type === 'error' ? 'alert-error' : 'alert-info';
        
        const icon = type === 'success' ? 'fa-check-circle' : 
                    type === 'error' ? 'fa-exclamation-triangle' : 'fa-info-circle';
        
        toast.innerHTML = `
            <div class="alert ${alertClass}">
                <i class="fas ${icon}"></i>
                <span>${message}</span>
            </div>
        `;
        
        document.body.appendChild(toast);
        
        // 添加進入動畫
        setTimeout(() => {
            toast.style.transform = 'translateX(0)';
            toast.style.opacity = '1';
        }, 100);
        
        // 自動移除
        setTimeout(() => {
            toast.style.transform = 'translateX(100%)';
            toast.style.opacity = '0';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    // Scroll animations
    setupScrollAnimations() {
        const animatedElements = document.querySelectorAll('.service-card, .stat, .card, .contact-info-item, .expertise-btn');
        
        // Add animate-on-scroll class to elements
        animatedElements.forEach(element => {
            element.classList.add('animate-on-scroll');
        });

        // Intersection Observer for scroll animations
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        animatedElements.forEach(element => {
            observer.observe(element);
        });
    }

    // Back to top functionality
    setupBackToTop() {
        const backToTopBtn = document.getElementById('backToTop');

        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.style.opacity = '1';
                backToTopBtn.style.pointerEvents = 'auto';
            } else {
                backToTopBtn.style.opacity = '0';
                backToTopBtn.style.pointerEvents = 'none';
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Service cards interaction
    setupServiceCards() {
        const serviceCards = document.querySelectorAll('.service-card');
        
        serviceCards.forEach(card => {
            const button = card.querySelector('.btn');
            
            if (button) {
                button.addEventListener('click', (e) => {
                    e.preventDefault();
                    const serviceTitle = card.querySelector('.card-title').textContent;
                    this.showServiceDetails(serviceTitle);
                });
            }
        });
    }

    showServiceDetails(serviceTitle) {
        // Create and show service details modal
        const modal = document.createElement('dialog');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-box">
                <h3 class="font-bold text-lg mb-4">
                    <i class="fas fa-info-circle text-primary mr-2"></i>
                    ${serviceTitle}
                </h3>
                <p class="py-4">
                    感謝您對「${serviceTitle}」服務的興趣！我們將為您提供專業的諮詢服務。
                    請透過聯絡資訊與我們聯繫，我們會盡快為您安排詳細的服務說明。
                </p>
                <div class="modal-action">
                    <form method="dialog">
                        <button class="btn btn-primary">了解</button>
                    </form>
                    <button class="btn btn-outline" onclick="document.getElementById('contact').scrollIntoView({behavior: 'smooth'}); this.closest('dialog').close();">
                        立即聯絡
                    </button>
                </div>
            </div>
            <form method="dialog" class="modal-backdrop">
                <button>close</button>
            </form>
        `;
        
        document.body.appendChild(modal);
        modal.showModal();
        
        // Remove modal after closing
        modal.addEventListener('close', () => {
            setTimeout(() => modal.remove(), 300);
        });
    }
}

// Utility functions
class AnimationController {
    static initScrollAnimations() {
        const elements = document.querySelectorAll('[data-animate]');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const animationType = entry.target.getAttribute('data-animate');
                    entry.target.classList.add(`animate-${animationType}`);
                }
            });
        });

        elements.forEach(element => observer.observe(element));
    }

    static animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        const timer = setInterval(() => {
            start += increment;
            element.textContent = Math.floor(start);
            
            if (start >= target) {
                element.textContent = target;
                clearInterval(timer);
            }
        }, 16);
    }
}

// Enhanced contact interactions
class ContactManager {
    static setupContactCopy() {
        const contactItems = document.querySelectorAll('.contact-info-item');
        
        contactItems.forEach(item => {
            item.style.cursor = 'pointer';
            item.title = '點擊複製或開啟';
            
            item.addEventListener('click', () => {
                const itemText = item.textContent;
                
                if (itemText.includes('netix.liu@business.com')) {
                    ContactManager.copyToClipboard('netix.liu@business.com', '電子郵件地址');
                } else if (itemText.includes('+886-2-1234-5678')) {
                    ContactManager.copyToClipboard('+886-2-1234-5678', '電話號碼');
                } else if (itemText.includes('台北市信義區信義路五段7號')) {
                    ContactManager.copyToClipboard('台北市信義區信義路五段7號', '地址');
                }
            });
        });
    }
    
    static async copyToClipboard(text, type) {
        try {
            await navigator.clipboard.writeText(text);
            ContactManager.showCopySuccess(type);
        } catch (err) {
            console.error('複製失敗:', err);
            ContactManager.showCopyError();
        }
    }
    
    static showCopySuccess(type) {
        const toast = document.createElement('div');
        toast.className = 'toast toast-top toast-end z-50';
        toast.innerHTML = `
            <div class="alert alert-success">
                <i class="fas fa-check-circle"></i>
                <span>${type}已複製到剪貼簿</span>
            </div>
        `;
        
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 3000);
    }
    
    static showCopyError() {
        const toast = document.createElement('div');
        toast.className = 'toast toast-top toast-end z-50';
        toast.innerHTML = `
            <div class="alert alert-error">
                <i class="fas fa-exclamation-triangle"></i>
                <span>複製失敗，請手動複製</span>
            </div>
        `;
        
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 3000);
    }
}

// Initialize website when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new NetixWebsite();
    ContactManager.setupContactCopy();
    
    // Initialize counter animations for stats
    const statValues = document.querySelectorAll('.stat-value');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.textContent);
                if (!isNaN(target)) {
                    AnimationController.animateCounter(entry.target, target);
                }
                statsObserver.unobserve(entry.target);
            }
        });
    });
    
    statValues.forEach(stat => {
        if (stat.textContent.includes('+')) {
            const number = parseInt(stat.textContent);
            if (!isNaN(number)) {
                stat.textContent = '0';
                statsObserver.observe(stat);
            }
        }
    });
});

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause animations when page is not visible
        document.body.style.animationPlayState = 'paused';
    } else {
        // Resume animations when page becomes visible
        document.body.style.animationPlayState = 'running';
    }
});

// Export for module usage
export { NetixWebsite, AnimationController, ContactManager };