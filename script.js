const useState = React.useState;
const useEffect = React.useEffect;

function OurApp() {
  const [pets, setPets] = useState([]);

  // only run once the first time this component is rendered
  useEffect(() => {
    if (localStorage.getItem("examplePetData")) {
      setPets(JSON.parse(localStorage.getItem("examplePetData")));
    }
  }, []);

  // run every time our pet state changes
  useEffect(() => {
    localStorage.setItem("examplePetData", JSON.stringify(pets));
  }, [pets]);

  return /*#__PURE__*/(
    React.createElement(React.Fragment, null, /*#__PURE__*/
    React.createElement(OurHeader, null), /*#__PURE__*/
    React.createElement(LikeArea, null), /*#__PURE__*/
    React.createElement(TimeArea, null), /*#__PURE__*/
    React.createElement(AddPetForm, { setPets: setPets }), /*#__PURE__*/
    React.createElement("ul", null,
    pets.map(pet => /*#__PURE__*/React.createElement(Pet, { setPets: setPets, id: pet.id, name: pet.name, species: pet.species, age: pet.age, key: pet.id }))), /*#__PURE__*/

    React.createElement(Footer, null)));


}

function AddPetForm(props) {
  const [name, setName] = useState();
  const [species, setSpecies] = useState();
  const [age, setAge] = useState();

  function handleSubmit(e) {
    e.preventDefault();
    props.setPets(prev => prev.concat({ name, species, age, id: Date.now() }));
    setName("");
    setSpecies("");
    setAge("");
  }

  return /*#__PURE__*/(
    React.createElement("form", { onSubmit: handleSubmit }, /*#__PURE__*/
    React.createElement("fieldset", null, /*#__PURE__*/
    React.createElement("legend", null, "Add New Pet"), /*#__PURE__*/
    React.createElement("input", { value: name, onChange: e => setName(e.target.value), placeholder: "Name" }), /*#__PURE__*/
    React.createElement("input", { value: species, onChange: e => setSpecies(e.target.value), placeholder: "species" }), /*#__PURE__*/
    React.createElement("input", { value: age, onChange: e => setAge(e.target.value), placeholder: "age in years" }), /*#__PURE__*/
    React.createElement("button", null, "Add Pet"))));



}

function LikeArea() {
  const [likeCount, setLikeCount] = useState(0);

  function increaseLikeHandler() {
    setLikeCount(function (prev) {
      return prev + 1;
    });
  }

  function decreaseLikeHandler() {
    setLikeCount(prev => {
      if (prev > 0) {
        return prev - 1;
      }
      return 0;
    });
  }

  return /*#__PURE__*/(
    React.createElement(React.Fragment, null, /*#__PURE__*/
    React.createElement("button", { onClick: increaseLikeHandler }, "Increase likes"), /*#__PURE__*/
    React.createElement("button", { onClick: decreaseLikeHandler }, "Decrease likes"), /*#__PURE__*/
    React.createElement("h2", null, "This page has been liked ", likeCount, " times.")));


}

function Pet(props) {
  function handleDelete() {
    props.setPets(prev => prev.filter(pet => pet.id != props.id));
  }

  return /*#__PURE__*/(
    React.createElement("li", null, props.name, " is a ", props.species, " and is ", props.age, " years old.", /*#__PURE__*/
    React.createElement("button", { onClick: handleDelete }, "Delete")));


}

function Footer() {
  return /*#__PURE__*/React.createElement("small", null, "Copyright Footer Text");
}

function TimeArea() {
  const [theTime, setTheTime] = useState(new Date().toLocaleString());

  useEffect(() => {
    const interval = setInterval(() => setTheTime(new Date().toLocaleString()), 1000);

    return () => clearInterval(interval);
  }, []);

  return /*#__PURE__*/React.createElement("p", null, "The current time is ", theTime, ".");
}

function OurHeader() {
  return /*#__PURE__*/React.createElement("h1", { className: "special" }, "Our Amazing App Header");
}

const root = ReactDOM.createRoot(document.querySelector("#app"));
root.render( /*#__PURE__*/React.createElement(OurApp, null));