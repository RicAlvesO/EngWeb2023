const axios=require('axios')

//axios.get('http://localhost:3000/pessoas?_sort=nome')
//    .then(res=>{
//        const pessoas=res.data
//        console.log("[Get] Got "+pessoas.length+" entries.")
//        pessoas.forEach(element => {
//            console.log("[Data] Name: "+element.nome)
//        });
//    })
//    .catch(e=>console.log('[Error] '+e))

axios.post('http://localhost:3000/pessoas',{
    id:'1112',
    CC:'187419r384',
    nome:'Maria'
    })
    .then(res=>{
        console.dir(res.status)
    })
    .catch(e=>console.log('[Error] '+e))