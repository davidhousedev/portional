import React from 'react'
import { connect } from 'react-redux';
import { listRecipes } from '../store/actions/recipe';

class RecipesPage extends React.Component {

  componentDidMount() {
    this.props.listRecipes()
  }

  render() {
    console.log(this.props.recipes);
    return <h1>Hello component</h1>;
  }
}

const mapStateToProps = state => ({
  recipes: state.recipes,
});

const mapDispatchToProps = dispatch => ({
  listRecipes: () => dispatch(listRecipes()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RecipesPage);
