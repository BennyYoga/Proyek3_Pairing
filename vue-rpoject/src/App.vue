<template>
  <TableComponent v-bind:students='students' @edit-student="editStudent" @delete-student="deleteStudent" />
  <FormComponent @add-student="addstudent" />
</template>

<script>
import TableComponent from './components/tableComponent.vue';
// import dataStudent from "./data/mahasiswa.json"
import FormComponent from './components/formComponent.vue'
import axios from 'axios'
// const apiMoan = "http://192.168.214.89:8080/mahasiswa";
const apiPribadi = "http://localhost:3000/mahasiswa"

export default {
  name: 'App',
  components: {
    TableComponent,
    FormComponent
  },
  data() {
    return {
      students: ""
    }
  },
  mounted() {
    try {
      axios.get(apiPribadi)
        .then((response) => {
          this.students = response.data
        })
    }
    catch (error) {
      console.log(error.message);
    }
  },
  methods: {
    addstudent(student) {
      const headers = { "Content-Type": "multipart/form-data" };
      axios.post(apiPribadi, student, {headers})
        .then(response => {
          this.students = [...this.student, response.data.data]
        })
        .catch(error => {
          if (error.response) {
            alert(error.response.data.message)
          }
        })
      // this.students.push(student);
    },
    deleteStudent(NIM) {
      try {
        axios.delete(`${apiPribadi}/${NIM}`)
          .then(() => {
            this.students = this.students.filter(function (student) {
              return student.NIM !== NIM
            })
          })
      }
      catch (error) {
        console.log("Data Error");
      }
    },
    editStudent(NIM, data) {
      const headers = { "Content-Type": "multipart/form-data" };
      axios.put(`${apiPribadi}/${NIM}`, data, {headers})
        .then(() => {
          this.students = this.students.map(student => (student.NIM === NIM ? data : student))
        })
    },
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
