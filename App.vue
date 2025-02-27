<script>
import uView from 'uview-ui';

// #ifndef VUE3
export default {
	onLaunch: function() {
		console.log('App Launch')
		// 初始化应用数据
		// 确保store存在后再调用其方法
		if (this.$store) {
			this.$store.dispatch('initAppData')
		} else {
			console.error('Store not initialized yet')
			// 延迟执行，确保store已初始化
			setTimeout(() => {
				if (this.$store) {
					this.$store.dispatch('initAppData')
				}
			}, 100)
		}
	},
	onShow: function() {
		console.log('App Show')
	},
	onHide: function() {
		console.log('App Hide')
	}
}

</script>

<style>
	/*每个页面公共css */
	@import './node_modules/uview-ui/index.scss';
</style>
