const chartAllItems = c3.generate({
	bindto: '#chart',
	data: {
    columns: [
        ['Louvre 雙人床架', 10],
        ['Antony 單人床架', 20],
        ['Antony 雙人床架', 30],
        ['其他', 40],
    ],
    type : 'pie',
  },
  color: {
    pattern: ['#DACBFF','#9D7FEA','#5434A7','#301E5F']
  }, 
  padding: {
    bottom: 32,
  },
});