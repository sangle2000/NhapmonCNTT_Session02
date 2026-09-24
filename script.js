document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Intersection Observer for scroll animations (fade in)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Apply animation to sections and cards
    const animatedElements = document.querySelectorAll('.section, .role-card, .domain-card, .glass-panel');
    animatedElements.forEach(el => {
        // Skip some elements that shouldn't be animated this way
        if(el.classList.contains('os-model') || el.classList.contains('navbar')) return;
        
        el.style.opacity = 0;
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });

    // Naming Mini-Game Logic
    const gameData = [
        { name: "Bài tập tuần 1.docx", isCorrect: false, fix: "bai-tap-tuan-01.docx", reason: "Có dấu tiếng Việt, khoảng trắng." },
        { name: "bao-cao-cuoi-ky.pdf", isCorrect: true, fix: "", reason: "Chuẩn kebab-case." },
        { name: "FINAL_final (1).docx", isCorrect: false, fix: "bao-cao-v2.docx", reason: "Có khoảng trắng, dấu ngoặc, tên mơ hồ." },
        { name: "du-an:web.zip", isCorrect: false, fix: "du-an-web.zip", reason: "Chứa ký tự cấm của hệ thống (:)" }
    ];

    const gameBoard = document.getElementById('naming-game');
    
    if (gameBoard) {
        gameData.forEach((item, index) => {
            const row = document.createElement('div');
            row.className = 'game-row';
            
            const nameSpan = document.createElement('span');
            nameSpan.className = 'game-name';
            nameSpan.textContent = item.name;
            
            const btnGroup = document.createElement('div');
            
            const btnFail = document.createElement('button');
            btnFail.className = 'game-btn btn-fail';
            btnFail.textContent = 'Trượt';
            
            const btnPass = document.createElement('button');
            btnPass.className = 'game-btn btn-pass';
            btnPass.style.marginLeft = '10px';
            btnPass.textContent = 'Đạt';
            
            const resultSpan = document.createElement('span');
            resultSpan.className = 'game-result';
            
            // Logic
            const handleAnswer = (userChoice) => {
                btnFail.style.display = 'none';
                btnPass.style.display = 'none';
                
                if (userChoice === item.isCorrect) {
                    resultSpan.textContent = '✅ Chính xác!';
                    resultSpan.style.color = '#10b981';
                } else {
                    resultSpan.textContent = '❌ Sai rồi!';
                    resultSpan.style.color = '#ef4444';
                }
                
                // Show reasoning
                const reasonDiv = document.createElement('div');
                reasonDiv.style.fontSize = '0.85rem';
                reasonDiv.style.color = 'var(--text-secondary)';
                reasonDiv.style.marginTop = '10px';
                reasonDiv.style.width = '100%';
                
                if(item.isCorrect) {
                    reasonDiv.innerHTML = `<em>${item.reason}</em>`;
                } else {
                    reasonDiv.innerHTML = `<em>Lỗi: ${item.reason}</em><br>Sửa thành: <strong class="text-success">${item.fix}</strong>`;
                }
                
                row.style.flexWrap = 'wrap';
                row.appendChild(reasonDiv);
            };

            btnFail.onclick = () => handleAnswer(false);
            btnPass.onclick = () => handleAnswer(true);
            
            btnGroup.appendChild(btnFail);
            btnGroup.appendChild(btnPass);
            btnGroup.appendChild(resultSpan);
            
            row.appendChild(nameSpan);
            row.appendChild(btnGroup);
            
            gameBoard.appendChild(row);
        });
    }
});
