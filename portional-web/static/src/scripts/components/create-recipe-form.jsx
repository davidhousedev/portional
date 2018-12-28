import React from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import InputAdornment from '@material-ui/core/InputAdornment';
import { TextField } from 'redux-form-material-ui';
import shortid from 'shortid';


const recipeInstructionFields = ({ fields, meta }) => (
  <div className="recipe-instruction-fields">
    <Typography component="h6" variant="h6">Instructions</Typography>
    {fields.map((instruction, idx, fields) => {
      const recipeIngredients = (
        <FieldArray name={`${instruction}.ingredients`} component={recipeIngredientFields} />
      );
      return (
        <div className="recipe-instruction" key={idx}>
          <Field
            autoFocus={idx === fields.length - 1}
            component={TextField}
            className="recipe-instruction-field"
            fullWidth
            InputProps={{
              startAdornment: <InputAdornment position="start">{idx + 1}.</InputAdornment>
            }}
            multiline
            name={`${instruction}.text`}
            placeholder="e.g. Preheat oven to 350˚"
            type="text"
          />
          {recipeIngredients}
        </div>
      )
    })}
    <TextField
      fullWidth
      InputLabelProps={{
        disableAnimation: true,
        shrink: false,
      }}
      label="New Instruction"
      onClick={() => fields.push({})}
      onKeyDown={({key}) => !['Tab', 'Shift'].includes(key) ? fields.push({}) : null }
    />
  </div>
);


const recipeIngredientFields = ({ fields, meta }) => (
  <div className="recipe-instruction-ingredient-fields">
    {fields.map((ingredient, idx, fields) => {
      return (
        <div className="recipe-instruction-ingredient" key={idx}>
          <Field
            autoFocus={idx === fields.length - 1}
            className="recipe-instruction-ingredient-field"
            component={TextField}
            margin="normal"
            name={`${ingredient}.name`}
            placeholder="e.g. Cocoa Powder"
            type="text"
          />
        </div>
      )
    })}
    <div className="recipe-instruction-ingredient-skeleton">
      <TextField
        InputLabelProps={{
          disableAnimation: true,
          shrink: false,
        }}
        label="New Ingredient"
        onClick={() => fields.push({})}
        onKeyDown={({key}) => !['Tab', 'Shift'].includes(key) ? fields.push({}) : null }
      />
    </div>
  </div>
);

const CreateRecipeForm = ({ handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit} autoComplete="off">
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
      <FieldArray name="instructions" component={recipeInstructionFields} />
    </form>
  );
};


export default reduxForm({
  form: 'createRecipe'
})(CreateRecipeForm);
