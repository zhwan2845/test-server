const API_BASE_URL = 'http://localhost:8081/api/auth';

// 폼 토글
function toggleForm() {
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    
    loginForm.classList.toggle('active');
    signupForm.classList.toggle('active');
    
    // 메시지 초기화
    document.getElementById('loginMessage').textContent = '';
    document.getElementById('signupMessage').textContent = '';
    document.getElementById('loginMessage').className = 'message';
    document.getElementById('signupMessage').className = 'message';
}

// 로그인 처리
async function handleLogin(event) {
    event.preventDefault();
    
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    const messageEl = document.getElementById('loginMessage');
    
    try {
        const response = await fetch(`${API_BASE_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password })
        });
        
        const data = await response.json();
        
        if (data.success) {
            messageEl.textContent = data.message;
            messageEl.className = 'message success';
            
            // 로그인 정보 저장
            localStorage.setItem('loggedIn', 'true');
            localStorage.setItem('username', data.username);
            localStorage.setItem('email', data.email);
            
            // 2초 후 대시보드로 이동
            setTimeout(() => {
                showDashboard();
            }, 1500);
        } else {
            messageEl.textContent = data.message;
            messageEl.className = 'message error';
        }
    } catch (error) {
        messageEl.textContent = '서버 연결에 실패했습니다.';
        messageEl.className = 'message error';
        console.error('Error:', error);
    }
}

// 회원가입 처리
async function handleSignup(event) {
    event.preventDefault();
    
    const username = document.getElementById('signupUsername').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const messageEl = document.getElementById('signupMessage');
    
    try {
        const response = await fetch(`${API_BASE_URL}/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, email, password })
        });
        
        const data = await response.json();
        
        if (data.success) {
            messageEl.textContent = data.message;
            messageEl.className = 'message success';
            
            // 입력 필드 초기화
            document.getElementById('signupUsername').value = '';
            document.getElementById('signupEmail').value = '';
            document.getElementById('signupPassword').value = '';
            
            // 2초 후 로그인 폼으로 이동
            setTimeout(() => {
                toggleForm();
            }, 1500);
        } else {
            messageEl.textContent = data.message;
            messageEl.className = 'message error';
        }
    } catch (error) {
        messageEl.textContent = '서버 연결에 실패했습니다.';
        messageEl.className = 'message error';
        console.error('Error:', error);
    }
}

// 대시보드 표시
function showDashboard() {
    const formContainer = document.querySelector('.form-container');
    const dashboard = document.getElementById('dashboard');
    const username = localStorage.getItem('username');
    const email = localStorage.getItem('email');
    
    formContainer.style.display = 'none';
    dashboard.classList.add('active');
    
    document.getElementById('dashboardUsername').textContent = username;
    document.getElementById('dashboardEmail').textContent = email;
}

// 로그아웃 처리
function handleLogout() {
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('username');
    localStorage.removeItem('email');
    
    const formContainer = document.querySelector('.form-container');
    const dashboard = document.getElementById('dashboard');
    
    dashboard.classList.remove('active');
    formContainer.style.display = 'block';
    
    // 로그인 폼으로 초기화
    document.getElementById('loginForm').classList.add('active');
    document.getElementById('signupForm').classList.remove('active');
    
    // 입력 필드 초기화
    document.getElementById('loginUsername').value = '';
    document.getElementById('loginPassword').value = '';
}

// 페이지 로드 시 로그인 상태 확인
window.addEventListener('DOMContentLoaded', function() {
    const isLoggedIn = localStorage.getItem('loggedIn');
    
    if (isLoggedIn === 'true') {
        showDashboard();
    }
});
