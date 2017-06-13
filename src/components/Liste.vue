<template>
	<div>
		<ul class="collection" col s12>
			<transition-group name="list">
				<li class="collection-item #ffebee red lighten-5" :key="faq.id" v-for="faq in dataStore.faqs">{{faq.question}} </br>{{faq.reponse}}<a href="#" @click="deletePost(faq.id)" class="secondary-content"><i class="material-icons">delete</i></a></li>
			</transition-group>
		</ul>
	</div>
</template>

<script>
	import { Store } from '@/Store.js';
	export default {
		name: 'liste',
		data() {
			return {
				dataStore: Store.datas,
			}
		},
		created() {
			this.$http.get('http://localhost:3000').then((response) => {
				this.dataStore.faqs = response.body;
			});
		},
		methods: {
			deletePost(id) {
				console.log(id)
				this.$http.get(`http://localhost:3000/delete/${id}`).then((response) => {
					this.dataStore.faqs = response.body
				});
			},
		}
	}

</script>

<style scoped>
	div {
		width: 900px;
		margin: auto;
		text-align: left;
	}
	
	.collection {
		border: 1px solid #fff;
	}
	
	.collection .collection-item {
		border-bottom: 1px solid #fff;
		margin-bottom: 3px;
	}
	
	.secondary-content {
		color: #a1887f;
	}
	
	.list-enter-active,
	.list-leave-active {
		transition: all 0.5s;
	}
	
	.list-enter,
	.list-leave-to {
		opacity: 0;
		transform: translateX(10px);
	}
</style>