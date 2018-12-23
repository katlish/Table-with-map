import React, { Component } from "react";
import Column from "../Column/Column";
import Map from "../Map/Map";
import clientsData from "../../assets/clients.json";
import "./Table.css";

export default class Table extends Component {
  constructor(props) {
    super(props);

    this.state = {
      allCountriesSorted: this.getItemsSorted("Country", "City"),
      allCitiesSorted: this.getItemsSorted("City", "CompanyName"),

      countries: [],
      cities: [],
      companies: [],

      country: "",
      city: "",
      CompanyName: "",
      address: ""
    };
  }

  componentDidMount() {
    this.setState(state => ({
      countries: state.allCountriesSorted
    }));

    this.setState(state => ({
      cities: this.getCities(state.allCountriesSorted[0])
    }));

    this.setState(state => ({
      companies: this.getCompanies(state.countries[0], state.cities[0])
    }));

    this.setState(state => ({
      address: this.getAddress(
        this.getCompanies(state.countries[0], state.cities[0])[0]
      )
    }));

    this.setState(state => ({
      country: state.countries[0]
    }));

    this.setState(state => ({
      city: state.cities[0]
    }));

    this.setState(state => ({
      CompanyName: state.companies[0]
    }));
  }

  getItemsSorted = (Item, SubItem) => {
    let arr = [];
    let create;

    clientsData.Customers.forEach(customer => {
      create = false;
      arr.map(x => {
        if (x.item === customer[Item]) {
          if (!x.items.find(i => i === customer[SubItem])) {
            x.items.push(customer[SubItem]);
          }
          create = true;
        }
      });

      if (!create) {
        arr.push({
          item: customer[Item],
          items: [customer[SubItem]]
        });
      }
    });

    arr.sort((a, b) => b.items.length - a.items.length);

    return arr.map(i => i.item);
  };

  updateCities = country => {
    this.setState(state => ({
      country: country,
      cities: this.getCities(country)
    }));

    this.setState(state => ({
      companies: this.getCompanies(state.country, state.cities[0])
    }));

    this.setState(state => ({
      address: this.getAddress(state.companies[0])
    }));
  };

  updateCompanies = city => {
    this.setState(state => ({
      city: city,
      companies: this.getCompanies(state.country, city)
    }));

    this.setState(state => ({
      address: this.getAddress(state.companies[0])
    }));
  };

  updateAddress = company => {
    this.setState({
      CompanyName: company,
      address: this.getAddress(company)
    });
  };

  getCountries = () => {
    return [
      ...new Set(clientsData.Customers.map(customer => customer.Country))
    ];
  };

  getCities = CountryName => {
    let allCitiesSorted = this.state.allCitiesSorted;

    let citiesInCountry = [
      ...new Set(
        clientsData.Customers.filter(
          customer => customer.Country === CountryName
        ).map(customer => customer.City)
      )
    ];

    let cities = [];

    allCitiesSorted.map(city => {
      if (citiesInCountry.find(x => x === city)) {
        cities.push(city);
      }
    });

    return cities;
  };

  getCompanies = (CountryName, CityName) => {
    return [
      ...new Set(
        clientsData.Customers.filter(
          customer =>
            customer.Country === CountryName && customer.City === CityName
        ).map(customer => customer.CompanyName)
      )
    ].sort();
  };

  getAddress = CompanyName => {
    return clientsData.Customers.filter(
      customer => customer.CompanyName === CompanyName
    ).map(
      customer => `${customer.Country}+${customer.City}+${customer.Address}`
    );
  };

  render() {
    return (
      <div className="Table">
        <Column
          title="Countries"
          items={this.state.countries}
          updateState={country => this.updateCities(country)}
          itemToSelect={this.state.country}
        />
        <Column
          title="Cities"
          items={this.state.cities}
          updateState={city => this.updateCompanies(city)}
          itemToSelect={this.state.city}
        />
        <Column
          title="Companies"
          items={this.state.companies}
          updateState={comp => this.updateAddress(comp)}
          itemToSelect={this.state.CompanyName}
        />
        <Column title="Map" updateState={addr => {}} width={"Map"}>
          <Map address={this.state.address} />
        </Column>
      </div>
    );
  }
}
