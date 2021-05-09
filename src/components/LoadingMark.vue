<template>
    <div v-show="value" class="loading-mark">
        <div class="loading-mark-cycle-1">
            <div class="spring-spinner">
                <div class="spring-spinner-part">
                    <div class="spring-spinner-rotator"></div>
                </div>
            </div>

            <div class="fingerprint-spinner">
                <div class="spinner-ring"></div>
                <div class="spinner-ring"></div>
                <div class="spinner-ring"></div>
                <div class="spinner-ring"></div>
                <div class="spinner-ring"></div>
                <div class="spinner-ring"></div>
                <div class="spinner-ring"></div>
                <div class="spinner-ring"></div>
                <div class="spinner-ring"></div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        value: Boolean,
    },
};
</script>

<style scoped>
.loading-mark {
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
}

.loading-mark-cycle-1 {
    height: 160px;
    width: 160px;
    position: fixed;
    top: calc(100vh / 3);
    left: calc((100vw / 2) - (160px / 2));
    background-color: rgb(255, 255, 255, 0.92);
    border-radius: 50%;
}

.light-bg {
    background-color: rgb(33, 33, 33, 0.2);
}

.dark-bg {
    background-color: rgb(33, 33, 33, 0.2);
}

.light {
    background-color: #3399FF;
}

.dark {
    background-color: #fff;
}

/* For spring */
.spring-spinner,
.spring-spinner * {
    box-sizing: border-box;
}

.spring-spinner {
    height: 100px;
    width: 100px;
    position: fixed;
    top: calc(110vh / 3);
    left: calc(100vw / 2 - 100px / 2);
}

.spring-spinner .spring-spinner-part {
    overflow: hidden;
    height: 100px;
    width: 100px;
}

.spring-spinner .spring-spinner-part {
    transform: rotate(180deg) scale(-1, 1);
}

.spring-spinner .spring-spinner-rotator {
    width: 100px;
    height: 100px;
    border: calc(100px / 8) solid transparent;
    border-right-color: #3399FF;
    border-top-color: #3399FF;
    border-radius: 50%;
    box-sizing: border-box;
    animation: spring-spinner-animation 3s ease-in-out infinite;
    transform: rotate(-200deg);
}

@keyframes spring-spinner-animation {
    0% {
        border-width: calc(50px / 10);
    }
    25% {
        border-width: calc(50px / 25);
    }
    50% {
        transform: rotate(115deg);
        border-width: calc(50px / 10);
    }
    75% {
        border-width: calc(50px / 25);
    }
    100% {
        border-width: calc(50px / 10);
    }
}

/* For fingerprint */
.fingerprint-spinner,
.fingerprint-spinner * {
    box-sizing: border-box;
}

.fingerprint-spinner {
    height: 50px;
    width: 50px;
    padding: 2px;
    overflow: hidden;
    position: fixed;
    top: calc(120vh / 3);
    left: calc(100vw / 2 - 50px / 2);
}

.fingerprint-spinner .spinner-ring {
    position: absolute;
    border-radius: 50%;
    border: 2px solid transparent;
    border-top-color: #3399FF;
    animation: fingerprint-spinner-animation 1500ms
        cubic-bezier(0.68, -0.75, 0.265, 1.75) infinite forwards;
    margin: auto;
    bottom: 0;
    left: 0;
    right: 0;
    top: 0;
}

.fingerprint-spinner .spinner-ring:nth-child(1) {
    height: calc(50px / 9 + 0 * 50px / 9);
    width: calc(50px / 9 + 0 * 50px / 9);
    animation-delay: calc(50ms * 1);
}

.fingerprint-spinner .spinner-ring:nth-child(2) {
    height: calc(50px / 9 + 1 * 50px / 9);
    width: calc(50px / 9 + 1 * 50px / 9);
    animation-delay: calc(50ms * 2);
}

.fingerprint-spinner .spinner-ring:nth-child(3) {
    height: calc(50px / 9 + 2 * 50px / 9);
    width: calc(50px / 9 + 2 * 50px / 9);
    animation-delay: calc(50ms * 3);
}

.fingerprint-spinner .spinner-ring:nth-child(4) {
    height: calc(50px / 9 + 3 * 50px / 9);
    width: calc(50px / 9 + 3 * 50px / 9);
    animation-delay: calc(50ms * 4);
}

.fingerprint-spinner .spinner-ring:nth-child(5) {
    height: calc(50px / 9 + 4 * 50px / 9);
    width: calc(50px / 9 + 4 * 50px / 9);
    animation-delay: calc(50ms * 5);
}

.fingerprint-spinner .spinner-ring:nth-child(6) {
    height: calc(50px / 9 + 5 * 50px / 9);
    width: calc(50px / 9 + 5 * 50px / 9);
    animation-delay: calc(50ms * 6);
}

.fingerprint-spinner .spinner-ring:nth-child(7) {
    height: calc(50px / 9 + 6 * 50px / 9);
    width: calc(50px / 9 + 6 * 50px / 9);
    animation-delay: calc(50ms * 7);
}

.fingerprint-spinner .spinner-ring:nth-child(8) {
    height: calc(50px / 9 + 7 * 50px / 9);
    width: calc(50px / 9 + 7 * 50px / 9);
    animation-delay: calc(50ms * 8);
}

.fingerprint-spinner .spinner-ring:nth-child(9) {
    height: calc(50px / 9 + 8 * 50px / 9);
    width: calc(50px / 9 + 8 * 50px / 9);
    animation-delay: calc(50ms * 9);
}

@keyframes fingerprint-spinner-animation {
    100% {
        transform: rotate(360deg);
    }
}
</style>
