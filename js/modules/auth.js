import { openModal, closeModal } from './modal.js'
import { getData } from './api.js'

export const authFunc = () => {
    const modal = document.getElementById('auth-modal')
    const authBtn = document.getElementById('open-auth-btn')
    const btnClose = document.querySelectorAll('.close-btn')
    const loginBtn = document.querySelector('.login-btn')
    const cartBtn = document.querySelector('#open-cart-btn')
    const logOutBtn = document.querySelector('#logout-btn');

    const login = () => {
        authBtn.classList.add('d-none')
        cartBtn.classList.remove('d-none')
        logOutBtn.classList.remove('d-none')
        closeModal(modal)
    }
    const logout = () => {
        authBtn.classList.remove('d-none')
        cartBtn.classList.add('d-none')
        logOutBtn.classList.add('d-none')
    }

    const checkAuth = () => {
        const local_user = JSON.parse(localStorage.getItem('auth'))
        if (local_user) {
            getData('http://localhost:3001/profile')
                .then((users) => {
                    const user = users.find((user) => {
                        return user.login === local_user.login && user.password === local_user.password
                    })

                    if (user) { login() }
                })
        }
    }
    checkAuth()

    authBtn.addEventListener('click', () => {
        openModal(modal)
    })
    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target === btnClose[0] || e.target === btnClose[1]) {
            closeModal(modal)
        }
    })

    loginBtn.addEventListener('click', () => {
        const loginInput = document.querySelector('#login-control');
        const passwordInput = document.querySelector('#password-control');

        let loginValue = loginInput.value
        let passwordValue = passwordInput.value


        getData('http://localhost:3001/profile')
            .then((users) => {
                const user = users.find((user) => {
                    return user.login === loginValue && user.password === passwordValue
                })

                if (!user) return alert("Пользователь не найден")
                if (user) {

                    loginInput.value = '';
                    passwordInput.value = '';

                    localStorage.setItem('auth', JSON.stringify(user))
                    checkAuth()
                }
            })
    })

    logOutBtn.addEventListener('click', () => {
        logout()
        localStorage.removeItem('auth');
    })

}