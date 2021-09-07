<template>
    <button class="CloseBtn">
        <img src="../assets/cross.svg" alt="close">
    </button>
</template>

<style lang="scss" scoped>
    .CloseBtn {
        background-color: transparent;
        border: none;
        color: white;
        font-size: 32px;
        transition: border-color .8s ease-out;
        cursor: pointer;
        max-width: 60px;
        max-height: 60px;
        transform: rotateZ(45deg);
        padding: 0;
        border: 1px solid transparent;
        z-index: 2;
        @media (min-width: 460px) {
        top: 50px;
        right: 80px;
        max-width: 80px;
        max-height: 80px;
        }
        
        &:focus {
        outline: 1px solid #fff;
        }
        img {
        width: 100%;
        height: auto;
        }
        &:hover {
        // background-color: #666;
        border: 1px solid #aaa;
        }
    }
</style>