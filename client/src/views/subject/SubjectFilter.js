export default (Subject,text) => {
    return Subject.filter(subject => {
        const  textMatch = subject.name.toLowerCase().includes(text.toLowerCase());
        return textMatch; 
    })
}