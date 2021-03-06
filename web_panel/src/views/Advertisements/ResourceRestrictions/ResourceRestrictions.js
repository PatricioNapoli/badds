import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import {
  Checkbox,
  FormGroup,
  FormControlLabel,
  Grid,
  InputLabel,
  Typography,
  FormControl,
  Button,
  TextField,
  LinearProgress
} from '@material-ui/core';
import { AppDuck } from '../../../duck';
import { actions, selectors } from '../duck/resources';
import { withProductLayout } from '../../../layouts/Main';
import { FailedSnackbar, SuccessSnackbar, Help } from '../../../components';
import { CountrySelect } from '../../../common/countries';
import { api } from '../../../helpers';

const textRestriction = {
  AGE: 'Banda de edades separada por comas, por ejemplo, 20-45,60-65',
  GENDER: 'Marcar solo si hay un genero objetivo para la pauta',
  COUNTRY_WHITELIST: 'Marcar los paises objetivo',
  COUNTRY_BLACKLIST: 'Marcar los paises excluidos de la pauta'
};

const genders = [
  { label: "Masculino", value: "M" },
  { label: "Femenino", value: "F" },
  { label: "Otro", value: "U" },
];

class ResourceRestrictionsBase extends Component {
  constructor(props) {
    super(props)
    this.state = {
      countryWhiteList: [],
      countryBlackList: [],
      genders: [],
      age: ''
    }

    this.handleAgeChange = this.handleAgeChange.bind(this);
    this.handleGenderChange = this.handleGenderChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault()
    const { create } = this.props;
    const payload = [];
    const resource = this.props.match.params.id;

    const AGE = this.findRestrictions('AGE');
    if (AGE !== null) {
      payload.push({ resource, restriction: AGE.id, value: this.state.age });
    }

    const GENDER = this.findRestrictions('GENDER');
    if (GENDER !== null) {
      const value = this.state.genders.join(',');
      payload.push({ resource, restriction: GENDER.id, value });
    }

    const COUNTRY_WHITELIST = this.findRestrictions('COUNTRY_WHITELIST');
    if (COUNTRY_WHITELIST !== null) {
      const value = this.state.countryWhiteList.join(',');
      payload.push({ resource, restriction: COUNTRY_WHITELIST.id, value });
    }

    const COUNTRY_BLACKLIST = this.findRestrictions('COUNTRY_BLACKLIST');
    if (COUNTRY_BLACKLIST !== null) {
      const value = this.state.countryBlackList.join(',');
      payload.push({ resource, restriction: COUNTRY_BLACKLIST.id, value });
    }
    create(payload);
  }

  handleAgeChange(e) {
    this.setState({age: e.target.value});
  }

  handleGenderChange(e) {
    if (e.target.checked) {
      this.setState({
        genders: [e.target.value, ...this.state.genders]
      });
    } else {
      this.setState({
        genders: this.state.genders.filter(gender => gender !== e.target.value)
      });
    }
  }

  setWhiteListCountry(code) {
    this.setState({
      countryWhiteList: code
    });
  }

  setBlackListCountry(code) {
    this.setState({
      countryBlackList: code
    });
  }

  findRestrictions(name) {
    const { restrictions } = this.props;
    return restrictions.find(restriction => restriction.restriction === name)
  }

  renderAge() {
    const restriction = this.findRestrictions('AGE');
    const ages = Array.from(new Array(100).keys());

    if (restriction == null) {
      return <span />
    }

    return (
      <Grid item md={4} xs={12}>
        <Typography variant="h4">Banda Edades</Typography>
        <Typography variant="body1">{textRestriction['AGE']}</Typography>
        <FormControl fullWidth>
          <TextField
            name="age"
            label="Rango de edad"
            value={this.state.age}
            onChange={this.handleAgeChange}
            placeholder="25-30,>40"
            InputProps={{
              startAdornment: <Help title="Restriciones de edad separadas por coma, ejemplo: 25-30,>60 buscara dentro del rango de 25 a 30 y personas mayores a 60." />
            }}
          />
        </FormControl>
      </Grid>
    )
  }

  renderCountryWhiteList() {
    const restriction = this.findRestrictions('COUNTRY_WHITELIST');

    if (restriction == null) {
      return <span />
    }

    return (
      <Grid item md={4} xs={12}>
        <Typography variant="h4">Paises Incluidos</Typography>
        <Typography variant="body1">{textRestriction['COUNTRY_WHITELIST']}</Typography>
        <FormControl fullWidth>
          <InputLabel id="badds-space-restriction-wcselect">Categoria</InputLabel>
          <CountrySelect
            value={ this.state.countryWhiteList }
            onCountrySelected={(countryCode) => this.setWhiteListCountry(countryCode) }
            labelId="badds-space-restriction-wcselect"
            startAdornment={<Help title="Completar para aquellos paises en los cuales se enfoca la pauta." />}
            multiple
          />
        </FormControl>
      </Grid>
    )
  }

  renderCountryBlackList() {
    const restriction = this.findRestrictions('COUNTRY_BLACKLIST');

    if (restriction == null) {
      return <span />
    }

    return (
      <Grid item md={4} xs={12}>
        <Typography variant="h4">Paises Excluidos</Typography>
        <Typography variant="body1">{textRestriction['COUNTRY_BLACKLIST']}</Typography>
        <FormControl fullWidth>
          <InputLabel id="badds-space-restriction-bcselect">Categoria</InputLabel>
          <CountrySelect
            value={ this.state.countryBlackList }
            onCountrySelected={(countryCode) => this.setBlackListCountry(countryCode) }
            labelId="badds-space-restriction-bcselect"
            startAdornment={<Help title="Completar solo si quiero excluir algun pais." />}
            multiple
          />
        </FormControl>
      </Grid>
    )
  }

  renderGender() {
    const restriction = this.findRestrictions('GENDER');

    if (restriction == null) {
      return <span />
    }

    return (
      <Grid item md={4} xs={12}>
        <Typography variant="h4">Genero Objetivo</Typography>
        <Typography variant="body1">{textRestriction['GENDER']}</Typography>
        <FormGroup row>
          {
           genders.map(gender => (<FormControlLabel
              key={gender.label}
              control={
                <Checkbox
                  checked={this.state.genders.findIndex(g => g === gender.value) >= 0 }
                  onChange={this.handleGenderChange}
                  value={gender.value}
                />
              }
              label={gender.label}
            />))
          }
        </FormGroup>
      </Grid>
    )
  }

  componentDidMount() {
    if(this.props.match.params.id) {
      this.props.fetchResource(this.props.match.params.id);
    }
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.resource.restrictions == null ||
      this.props.resource.restrictions.length === 0
    ) {
      return null;
    }

    if (prevProps.resource.name !== this.props.resource.name) {
      const restrictions = api.parseRestrictions(this.props.resource.restrictions);
      this.setState({...restrictions});
    }
  }

  render() {
    const { isLoading, hasError, success } = this.props;
    let progressBar = null;

    if (isLoading & !hasError) {
      progressBar = (<Grid item xs={12}>
        <LinearProgress />
      </Grid>)
    }

    return (<form onSubmit={this.handleSubmit}>
      {
        hasError && <FailedSnackbar message="Tuvimos un problema al procesar su peticion" />
      }
      {
        success && <SuccessSnackbar message="Operacion concluida con exito" />
      }
      <Grid container spacing={2}>
        { progressBar }
        { this.renderAge() }
        { this.renderCountryWhiteList() }
        { this.renderCountryBlackList() }
        { this.renderGender() }
        <Grid item xs={12}>
          <Button type="submit" color="primary" variant="contained">Guardar Restricciones</Button>
        </Grid>
      </Grid>
    </form>);
  }
}

export const mapStateToProps = (state) => ({
  isLoading: selectors.isLoading(state),
  hasError: selectors.hasError(state),
  success: selectors.success(state),
  resource: selectors.getResource(state),
  restrictions: AppDuck.selectors.getRestrictions(state),
});

export const mapDispatchToProps = {
  create: actions.addRestriction,
  fetchResource: actions.fetch
}

const ResourceRestrictions = compose(
  withProductLayout({
    title: 'Restricciones de los recursos',
    withPagination: false,
    Buttons: null
  }),
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(ResourceRestrictionsBase);

export { ResourceRestrictions };
