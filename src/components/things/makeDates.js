export function makeDates(day1,month1,year1,day2,month2,year2,day3,month3,year3){
	const firstDay = day1 + '-' + month1 + '-' + year1;
	const secondDay = day2 + '-' + month2 + '-' + year2;
	const thirdDay = day3 + '-' + month3 + '-' + year3;
	const dateReqAr = [firstDay,secondDay,thirdDay];
	return dateReqAr
}
