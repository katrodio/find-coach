<template>
	<div class="modal">
		<div class="modal-back"></div>
		<div class="modal-front">
			<div class="modal-content">
				<slot></slot>
			</div>
			<button class="modal-close" @click="closeModal">X</button>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			transition: true,
		};
	},
	methods: {
		closeModal() {
			this.$emit('closeModal');
		},
	},
};
</script>

<style>
.modal {
	display: flex;
	justify-content: center;
	align-items: center;
	position: fixed;
	left: 100px;
	right: 100px;
	bottom: 100px;
	top: 100px;
}
.modal-back {
	position: absolute;
	transform: rotate(-10deg);
	background: linear-gradient(180deg, #8b89ff, #3643ff);
	box-shadow: inset -2px 0px 4px rgba(0, 4, 250, 0.3),
		inset 0 0 56px rgba(70, 106, 225, 0.3);
	filter: drop-shadow(0px 30px 50px rgba(0, 4, 250, 0.3));
	height: 150px;
	width: 310px;
	border-radius: 20px;
}
.modal-front {
	position: relative;
	height: 150px;
	width: 310px;
	border-radius: 20px;
	background-color: #fff;
	background: linear-gradient(
		180deg,
		rgba(191, 186, 255, 0.3),
		rgba(222, 225, 255, 0.6)
	);
	backdrop-filter: blur(16px);
	box-shadow: inset -1px 1px 1px rgba(255, 255, 255, 0.4),
		inset 0px 0px 35px rgba(0, 0, 0, 0.08);
}
.modal-content {
	display: flex;
	align-items: center;
	height: inherit;
	overflow: scroll;
	width: 310px;
}
.modal-content p {
	color: white;
	font-size: 22px;
	font-weight: 700;
	margin: 15px;
}
.modal-content::-webkit-scrollbar {
	width: 3px;
	height: 3px;
}
.modal-content::-webkit-scrollbar-thumb {
	background-color: white;
}
.modal-close {
	position: absolute;
	top: 10px;
	right: 10px;
	content: '';
	width: 30px;
	height: 30px;
	border-radius: 50%;
	background-color: white;
	color: blue;
	font-weight: 600;
	border: none;
}
.modal-enter-active,
.modal-leave-active {
	transition: all 0.5s ease-out;
}

.modal-enter-to,
.modal-leave-from {
	opacity: 1;
}

.modal-enter-from,
.modal-leave-to {
	opacity: 0;
}
</style>