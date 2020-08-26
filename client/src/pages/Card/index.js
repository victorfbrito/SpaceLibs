import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPen,
  faTimes,
  faCheck,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

import Footer from "~/components/footer";
import MainHeader from "~/components/mainheader";

import CardServer from "~/server/pages/card";

import Config from "../../config/baseurl";

export default function Card(id) {
  const [data, setData] = useState("");
  const [EditDesc, setEditDesc] = useState(null);
  const [EditName, setEditName] = useState(null);
  const [EditFile, setEditFile] = useState(null);
  const [name, setName] = useState(null);
  const [descr, setDesc] = useState(null);
  const [file, setFile] = useState(null);

  useEffect(() => {
    getData();
  }, []);

  const cardId = id.match.params.id;

  const getData = async () => {
    const card = await CardServer.get(cardId);
    setData(card);
  };

  const handleDelCard = async (e, key) => {
    e.preventDefault();
    await CardServer.del(key);
    getData();
  };

  const showEditDesc = async () => {
    setEditDesc(true);
    setEditName(false);
    setEditFile(false);
  };

  const hideEditDesc = () => {
    setEditDesc(false);
  };

  const handleEditDesc = async (e, descr, key) => {
    try {
      e.preventDefault();
      await CardServer.putDesc(descr, key);
      setDesc(null);
      hideEditDesc();
      getData();
    } catch (err) {}
  };

  const showEditFile = async () => {
    setEditFile(true);
    setEditName(false);
    setEditDesc(false);
  };

  const hideEditFile = () => {
    setEditFile(false);
  };

  const FileCatcher = async (e) => {
    setFile(e.target.files[0]);
    console.log(file);
  };

  const handleEditFile = async (e, file, key) => {
    try {
      e.preventDefault();
      //const fd = new FormData();
      let fd = new FormData();
      console.log(file);
      fd.append("file", file, file.name);
      await CardServer.putFile(fd, key);
      setFile(null);
      hideEditFile();
      getData();
    } catch (err) {}
  };

  const showEditName = async () => {
    setEditName(true);
    setEditFile(false);
    setEditDesc(false);
  };

  const hideEditName = () => {
    setEditName(false);
  };

  const handleEditName = async (e, name, key) => {
    try {
      e.preventDefault();
      //const fd = new FormData();
      await CardServer.putName(name, key);
      setName(null);
      hideEditName();
      getData();
    } catch (err) {}
  };

  return (
    <>
      <MainHeader />
      <div className="background"></div>

      <div className="container">
        <div className="rollpage">
          <a className="arrow-left" href="/" />
        </div>
        <div className="card">
          <div className="left">
            <button
              className="editCard editName"
              onClick={(e) => showEditName()}
            >
              <FontAwesomeIcon icon={faPen} />
            </button>
            {EditName && (
              <>
                {" "}
                <form
                  id="EditName"
                  onSubmit={(e) => handleEditName(e, name, data.id)}
                >
                  <div className="line">
                    <p className="title">
                      <input
                        className="edit name"
                        type="name"
                        name="name"
                        placeholder={`${data.title}`}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </p>
                  </div>
                  <button
                    className="result"
                    type="button"
                    onClick={(e) => hideEditName()}
                  >
                    <FontAwesomeIcon icon={faTimes} />
                  </button>
                  <button className="result">
                    <FontAwesomeIcon icon={faCheck} />
                  </button>
                </form>{" "}
              </>
            )}
            {!EditName && <h1>{data.title}</h1>}
            <button
              className="editCard editImg"
              onClick={(e) => showEditFile()}
            >
              <FontAwesomeIcon icon={faPen} />
            </button>
            {EditFile && (
              <>
                {" "}
                <div className="blurcontainer">
                  <div className="blur">
                    {!file && (
                      <img
                        src={`${Config.baseurl}/files/${data.image}`}
                        alt={data.title}
                      />
                    )}
                    {file && <img src={`${file}`} alt={data.title} />}
                    <div className="gradient" />
                  </div>
                  <form
                    id="EditFile"
                    onSubmit={(e) => handleEditFile(e, file, data.id)}
                  >
                    <div className="line imageForm">
                      <input
                        className="edit file"
                        type="file"
                        id="picture"
                        name="picture"
                        accept="image/jpg
                      ,image/jpeg"
                        onChange={(e) => FileCatcher(e)}
                      />
                    </div>
                    <button
                      className="result upper"
                      type="button"
                      onClick={(e) => hideEditFile()}
                    >
                      <FontAwesomeIcon icon={faTimes} />
                    </button>
                    <button className="result upper">
                      <FontAwesomeIcon icon={faCheck} />
                    </button>
                  </form>{" "}
                </div>
              </>
            )}
            {!EditFile && (
              <>
                <img
                  src={`${Config.baseurl}/files/${data.image}`}
                  alt={data.title}
                />
                <div className="gradient" />
              </>
            )}
            <button
              className="result del"
              onClick={(e) => handleDelCard(e, data.id)}
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
          <div className="right">
            <button className="editCard" onClick={(e) => showEditDesc()}>
              <FontAwesomeIcon icon={faPen} />
            </button>
            <h1>About</h1>
            {EditDesc && (
              <>
                <form
                  id="editDesc"
                  onSubmit={(e) => handleEditDesc(e, descr, data.id)}
                >
                  <textarea
                    id="textarea"
                    className="edit descr"
                    form="editDesc"
                    name="descr"
                    cols="30"
                    placeholder={`${data.text}`}
                    onChange={(e) => setDesc(e.target.value)}
                  />
                  <button
                    class="result"
                    type="button"
                    onClick={(e) => hideEditDesc()}
                  >
                    <FontAwesomeIcon icon={faTimes} />
                  </button>
                  <button class="result">
                    <FontAwesomeIcon icon={faCheck} />
                  </button>
                </form>
              </>
            )}
            {!EditDesc && <p>{data.text}</p>}
            <div className="about">
              <div className=" title">
                <img src={`/img/${data.type}logo.svg`} alt={data.title} />
                <h1>
                  {data.title} is a {data.type}
                </h1>
              </div>
              {data.type === "star" && (
                <p>
                  {" "}
                  A star is an astronomical object consisting of a luminous
                  spheroid of plasma held together by its own gravity. The
                  nearest star to Earth is the Sun. Many other stars are visible
                  to the naked eye from Earth during the night, appearing as a
                  multitude of fixed luminous points in the sky due to their
                  immense distance from Earth.
                  <a
                    href={`https://en.wikipedia.org/wiki/${data.type}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Read more about {data.type}s
                  </a>
                </p>
              )}
              {data.type === "galaxy" && (
                <p>
                  {" "}
                  A galaxy is a gravitationally bound system of stars, stellar
                  remnants, interstellar gas, dust, and dark matter. The word
                  galaxy is derived from the Greek galaxias, literally "milky",
                  a reference to the Milky Way. Galaxies range in size from
                  dwarfs with just a few hundred million (108) stars to giants
                  with one hundred trillion (1014) stars, each orbiting its
                  galaxy's center of mass. Galaxies are categorized according to
                  their visual morphology as elliptical, spiral, or irregular.
                  Many galaxies are thought to have supermassive black holes at
                  their centers. The Milky Way's central black hole, known as
                  Sagittarius A*, has a mass four million times greater than the
                  Sun. As of March 2016, GN-z11 is the oldest and most distant
                  observed galaxy with a comoving distance of 32 billion
                  light-years from Earth, and observed as it existed just 400
                  million years after the Big Bang.
                  <a
                    href={`https://en.wikipedia.org/wiki/${data.type}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Read more about {data.type}s
                  </a>
                </p>
              )}
              {data.type === "moon" && (
                <p>
                  {" "}
                  A natural satellite, or moon, is, in the most common usage, an
                  astronomical body that orbits a planet or minor planet (or
                  sometimes another small Solar System body). In the Solar
                  System, there are six planetary satellite systems containing
                  205 known natural satellites. Four IAU-listed dwarf planets
                  are also known to have natural satellites: Pluto, Haumea,
                  Makemake, and Eris. As of September 2018, there are 334 other
                  minor planets known to have moons.
                  <a
                    href={`https://en.wikipedia.org/wiki/Natural_satellite`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Read more about {data.type}s
                  </a>
                </p>
              )}
              {data.type === "planet" && (
                <p>
                  {" "}
                  A planet is an astronomical body orbiting a star or stellar
                  remnant that is massive enough to be rounded by its own
                  gravity, is not massive enough to cause thermonuclear fusion,
                  and has cleared its neighbouring region of planetesimals. The
                  term planet is ancient, with ties to history, astrology,
                  science, mythology, and religion. Apart from Earth itself,
                  five planets in the Solar System are often visible to the
                  naked eye. These were regarded by many early cultures as
                  divine, or as emissaries of deities. As scientific knowledge
                  advanced, human perception of the planets changed,
                  incorporating a number of disparate objects. In 2006, the
                  International Astronomical Union (IAU) officially adopted a
                  resolution defining planets within the Solar System. This
                  definition is controversial because it excludes many objects
                  of planetary mass based on where or what they orbit. Although
                  eight of the planetary bodies discovered before 1950 remain
                  "planets" under the current definition, some celestial bodies,
                  such as Ceres, Pallas, Juno and Vesta (each an object in the
                  solar asteroid belt), and Pluto (the first trans-Neptunian
                  object discovered), that were once considered planets by the
                  scientific community, are no longer viewed as planets under
                  the current definition of planet.
                  <a
                    href={`https://en.wikipedia.org/wiki/${data.type}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Read more about {data.type}s
                  </a>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
