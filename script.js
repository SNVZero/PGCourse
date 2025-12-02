// Общие скрипты для всех страниц сайта

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mainNav = document.getElementById('mainNav');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            mainNav.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (mainNav && mobileMenuBtn && 
            !mainNav.contains(event.target) && 
            !mobileMenuBtn.contains(event.target) && 
            mainNav.classList.contains('active')) {
            mainNav.classList.remove('active');
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Проверяем, является ли ссылка якорем на текущей странице
            if (href.startsWith('#') && href.length > 1) {
                e.preventDefault();
                
                const targetId = href;
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    // Закрываем мобильное меню, если оно открыто
                    if (mainNav) {
                        mainNav.classList.remove('active');
                    }
                    
                    window.scrollTo({
                        top: targetElement.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Highlight current module in sidebar navigation
    const currentPage = window.location.pathname.split('/').pop();
    const moduleLinks = document.querySelectorAll('.module-nav a');
    
    moduleLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage) {
            link.classList.add('active');
        }
    });
    
    // Highlight current section in main navigation
    const navLinks = document.querySelectorAll('nav a');
    const currentModule = currentPage.replace('.html', '');
    
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage || 
            (currentPage === 'index.html' && linkHref === '#modules') ||
            (linkHref && linkHref.includes(currentModule))) {
            link.classList.add('active');
        }
    });
    
    // Copy code button functionality
    document.querySelectorAll('.code-example').forEach(codeBlock => {
        const copyButton = document.createElement('button');
        copyButton.className = 'copy-code-btn';
        copyButton.innerHTML = '<i class="far fa-copy"></i> Копировать';
        copyButton.style.cssText = `
            position: absolute;
            top: 10px;
            right: 10px;
            background: var(--primary-color);
            color: white;
            border: none;
            padding: 5px 10px;
            border-radius: 4px;
            cursor: pointer;
            font-size: 0.9rem;
            transition: var(--transition);
        `;
        
        codeBlock.style.position = 'relative';
        codeBlock.appendChild(copyButton);
        
        copyButton.addEventListener('click', function() {
            const code = codeBlock.querySelector('code').innerText;
            navigator.clipboard.writeText(code).then(() => {
                const originalText = copyButton.innerHTML;
                copyButton.innerHTML = '<i class="fas fa-check"></i> Скопировано!';
                copyButton.style.background = 'var(--accent-color)';
                
                setTimeout(() => {
                    copyButton.innerHTML = originalText;
                    copyButton.style.background = 'var(--primary-color)';
                }, 2000);
            });
        });
    });
    
    // Exercise solution toggle
    document.querySelectorAll('.exercise').forEach(exercise => {
        const solutionBtn = document.createElement('button');
        solutionBtn.className = 'solution-toggle';
        solutionBtn.innerHTML = 'Показать решение';
        solutionBtn.style.cssText = `
            background: var(--accent-color);
            color: white;
            border: none;
            padding: 8px 15px;
            border-radius: 4px;
            cursor: pointer;
            font-weight: 600;
            transition: var(--transition);
            margin-top: 10px;
        `;
        
        exercise.appendChild(solutionBtn);
        
        const solutionDiv = document.createElement('div');
        solutionDiv.className = 'solution';
        solutionDiv.style.cssText = `
            display: none;
            margin-top: 15px;
            padding: 15px;
            background: white;
            border-radius: var(--border-radius);
            border-left: 4px solid var(--primary-color);
        `;
        
        // Добавляем пример решения (в реальном проекте можно загружать из базы данных)
        const exerciseType = exercise.querySelector('h4').innerText.toLowerCase();
        let solutionCode = '';
        
        if (exerciseType.includes('select')) {
            solutionCode = `SELECT * FROM employees WHERE department = 'IT';`;
        } else if (exerciseType.includes('join')) {
            solutionCode = `SELECT e.name, d.department_name 
FROM employees e 
JOIN departments d ON e.department_id = d.id;`;
        } else if (exerciseType.includes('группировка')) {
            solutionCode = `SELECT department, COUNT(*) as employee_count 
FROM employees 
GROUP BY department 
HAVING COUNT(*) > 5;`;
        } else {
            solutionCode = `-- Решение упражнения\nSELECT * FROM table_name WHERE condition;`;
        }
        
        solutionDiv.innerHTML = `<h5>Решение:</h5><pre><code>${solutionCode}</code></pre>`;
        exercise.appendChild(solutionDiv);
        
        solutionBtn.addEventListener('click', function() {
            if (solutionDiv.style.display === 'none') {
                solutionDiv.style.display = 'block';
                solutionBtn.innerHTML = 'Скрыть решение';
            } else {
                solutionDiv.style.display = 'none';
                solutionBtn.innerHTML = 'Показать решение';
            }
        });
    });
});