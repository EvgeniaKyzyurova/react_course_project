import Moment from 'moment';

export const DateGenerator = ({ date }) => {
	let getDate = Moment(date, 'DD/MM/YYYY').toDate();
	let formatDate = Moment(getDate).format('DD.MM.YYYY');
	return <span data-testid='course-date'> {formatDate} </span>;
};
