import { schema } from 'normalizr';

export const equipment = new schema.Entity('equipment', {}, { idAttribute: 'uid' });

export const ingredient = new schema.Entity('ingredient', {}, { idAttribute: 'uid' });

export const recipeIngredient = new schema.Entity('recipeIngredient', {}, { idAttribute: 'uid' });

export const instruction = new schema.Entity('instruction', {
  ingredients: [ ingredient ],
  equipment: [ equipment ],
}, { idAttribute: 'uid' });

export const recipe = new schema.Entity('recipe', {
  ingredients: [ recipeIngredient ],
  instructions: [ instruction ],
}, {
  idAttribute: 'uid'
});
export const recipeList = [ recipe ];