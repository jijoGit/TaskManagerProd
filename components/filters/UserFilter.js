//     // Create an input field in the CustomFilter component where the user can enter their custom filter criteria.

//     // Create a button or some other type of control that the user can click to submit their custom filter criteria.

//     // In the function that handles the button click or the control press, use the value entered in the input field to create a new object that represents the custom filter.

//     // Add the new object to the filters array, so that it is available for selection.



//     const [customCriteria, setCustomCriteria] = useState('');

// const handleCustomFilterSubmit = () => {
//     // Create a new object representing the custom filter
//     const customFilter = {
//         id: 'custom',
//         name: 'Custom',
//         criteria: customCriteria
//     };

//     // Add the new filter to the filters array
//     setFilters([...filters, customFilter]);

//     // Clear the input field
//     setCustomCriteria('');
// }
