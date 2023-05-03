export const PipeDuration = ({ time }) => {
	const hours = Math.floor(time / 60);
	const min = time - hours * 60;
	const editedTime = `${hours}:${min} hours`;
	return <span data-testid='course-duration'> {editedTime} </span>;
};
