<template>
	<div class="hello">
		<div class="row">
			<form class="col s12">
				<div class="row">
					<div class="input-field col s6">
						<input v-validate="'required|min:8|max:300'" id="question" name="question" type="text" class="validate" v-model="dataStore.newQuestion.question">
						<label for="first_name">Question</label>
						<span v-show="errors.has('question')" class="help is-danger"><i>{{ errors.first('question') }}</i></span>
					</div>
					<div class="input-field col s6">
						<input v-validate="'required|min:4'" id="reponse" name="reponse" type="text" class="validate" v-model="dataStore.newQuestion.reponse">
						<label for="last_name">Réponse</label>
						<span v-show="errors.has('reponse')" class="help is-danger"><i>{{ errors.first('reponse') }}</i></span>
					</div>

				</div>
			</form>

		</div>
		<div class="row buttn">
			<button class="btn waves-effect waves-light #a1887f brown lighten-2" type="submit" @click="send()" name="action">Envoyer</button>
		</div>
	</div>
</template>


<script>
	import { Store } from '@/Store.js';
	export default {
		name: 'form',
		data() {
			return {
				dataStore: Store.datas,
			}
		},
		methods: {
			send() {
				this.$http.post('http://localhost:3000/new', this.dataStore.newQuestion).then((res) => {
					this.dataStore.faqs = res.body; // on stock dans le Store 
					console.log('coucou')
					this.dataStore.newQuestion = {
						question: '',
						reponse: ''
					}
				});
			}
		}
	}

</script>

<style scoped>
	div {
		width: 900px;
		margin: auto;
		text-align: left;
		padding-top: 10px;
		padding-bottom: 10px;
	}
	
	button {
		margin-top: 20px;
		margin-bottom: 20px;
	}
	
	.buttn {
		text-align: center;
	}
	
	i {
		font-size: 13px;
		color: #a1887f;
	}
	
	.input-field input:focus {
		border-bottom: 1px solid #a1887f;
		box-shadow: 0 1px 0 0 #a1887f;
	}
	
	input[type=text]:focus:not([readonly])+label {
		color: #a1887f;
	}
	
	input[type=text].valid {
		border-bottom: 1px solid #a1887f;
		box-shadow: none;
	}
</style>