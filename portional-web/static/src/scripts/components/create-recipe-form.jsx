import React from 'react';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import InputAdornment from '@material-ui/core/InputAdornment';
import shortid from 'shortid';


// const recipeInstructionFields = ({ fields, meta }) => (
//   <div className="recipe-instruction-fields form-group">
//     <Typography component="h6" variant="h6">Instructions</Typography>
//     {fields.map((instruction, idx, fields) => {
//       return (
//         <div className="recipe-instruction" key={idx}>
//           <Field
//             autoFocus={idx === fields.length - 1}
//             component={TextField}
//             className="recipe-instruction-field"
//             fullWidth
//             InputProps={{
//               startAdornment: <InputAdornment position="start">{idx + 1}.</InputAdornment>
//             }}
//             margin="normal"
//             multiline
//             name={`${instruction}.text`}
//             placeholder="e.g. Combine butter and sugar in the bowl of a standing mixer. "
//             type="text"
//           />
//           <FieldArray name={`${instruction}.ingredients`} component={recipeIngredientFields} />
//           <FieldArray name={`${instruction}.equipment`} component={recipeEquipmentFields} />
//         </div>
//       )
//     })}
//     <TextField
//       fullWidth
//       InputLabelProps={{
//         disableAnimation: true,
//         shrink: false,
//       }}
//       label="New Instruction"
//       onClick={() => fields.push({})}
//       // Allow users to begin typing a new item and transfer that key to the new field
//       onKeyDown={({key}) => !['Tab', 'Shift'].includes(key) ? fields.push({}) : null }
//     />
//   </div>
// );


// const recipeIngredientFields = ({ fields, meta }) => (
//   <div className="recipe-instruction-ingredient-fields form-indent form-gutter-upper">
//     <Typography component="h6" variant="subtitle1">Ingredients Used</Typography>
//     {fields.map((ingredient, idx, fields) => {
//       const ingredientUnitSelectId = `${ingredient}SelectFieldId`;
//       return (
//         <div className="recipe-instruction-ingredient" key={idx}>
//           <Field
//             component={TextField}
//             // margin="normal"
//             name={`${ingredient}.amount`}
//             label="Amount"
//             type="number"
//           />
//           <FormControl className="form-control" required>
//             <InputLabel htmlFor={ingredientUnitSelectId}>Unit</InputLabel>
//             <Field
//               name={`${ingredient}.unit`}
//               component={Select}
//               margin="normal"
//               validate={required}
//               inputProps={{
//                 id: ingredientUnitSelectId,
//               }}
//             >
//               <MenuItem disabled value="null">Volume</MenuItem>
//               <MenuItem value="tsp">Teaspoon</MenuItem>
//               <MenuItem value="tbsp">Tablespoon</MenuItem>
//               <MenuItem value="floz">Fluid Ounce</MenuItem>
//               <MenuItem value="cup">Cup</MenuItem>
//               <MenuItem value="pint">Pint</MenuItem>
//               <MenuItem value="qt">Quart</MenuItem>
//               <MenuItem value="gal">Gallon</MenuItem>
//               <MenuItem disabled value="null">Mass & Weight</MenuItem>
//               <MenuItem value="oz">Ounce</MenuItem>
//               <MenuItem value="lb">Pound</MenuItem>
//             </Field>
//           </FormControl>
//           <Field
//             autoFocus={idx === fields.length - 1}
//             className="recipe-instruction-ingredient-field"
//             component={TextField}
//             margin="normal"
//             name={`${ingredient}.name`}
//             placeholder="e.g. Cocoa Powder"
//             type="text"
//           />
//         </div>
//       )
//     })}
//     <div className="recipe-instruction-ingredient-skeleton form-group">
//       <TextField
//         fullWidth
//         InputLabelProps={{
//           disableAnimation: true,
//           shrink: false,
//         }}
//         label="New Ingredient"
//         onClick={() => fields.push({})}
//         // Allow users to begin typing a new item and transfer that key to the new field
//         onKeyDown={({key}) => !['Tab', 'Shift'].includes(key) ? fields.push({}) : null }
//       />
//     </div>
//   </div>
// );

// const recipeEquipmentFields = ({ fields, meta }) => (
//   <div className="recipe-instruction-equipment-fields form-indent form-gutter-upper">
//     <Typography component="h6" variant="subtitle1">Equipment Used</Typography>
//     {fields.map((equipment, idx, fields) => (
//       <div className="recipe-instruction-equipment" key={idx}>
//         <Field
//             autoFocus={idx === fields.length - 1}
//             className="recipe-instruction-equipment-field"
//             component={TextField}
//             fullWidth
//             margin="normal"
//             name={`${equipment}.name`}
//             placeholder="e.g. Wisk"
//             type="text"
//         />
//       </div>
//     ))}
//     <div className="recipe-instruction-equipment-skeleton form-group">
//       <TextField
//         fullWidth
//         InputLabelProps={{
//           disableAnimation: true,
//           shrink: false,
//         }}
//         label="New Equipment"
//         onClick={() => fields.push({})}
//         // Allow users to begin typing a new item and transfer that key to the new field
//         onKeyDown={({key}) => !['Tab', 'Shift'].includes(key) ? fields.push({}) : null }
//       />
//     </div>
//   </div>
// )

const CreateRecipeForm = ({ handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit} autoComplete="off" className="form">
      <div className="form-section">
        <Typography component="h6" variant="h6">Name</Typography>
        <Field
          component={TextField}
          fullWidth
          helperText="Provide a name for your recipe"
          label="Recipe Name"
          name="name"
          placeholder="e.g. Mom's Chocolate Chip Cookies"
          type="text"
        />
      </div>
      <div className="form-section">
        <FieldArray name="instructions" component={recipeInstructionFields} />
      </div>
    </form>
  );
};


export default reduxForm({
  form: 'createRecipe'
})(CreateRecipeForm);
