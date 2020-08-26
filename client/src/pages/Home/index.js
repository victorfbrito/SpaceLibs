import React, { useEffect, useState } from "react";
import Card from "~/components/card";
import MainHeader from "~/components/mainheader";
import Footer from "~/components/footer";
import { Container, Row, Button } from "react-bootstrap";

export default function Home() {
  const [data, setData] = useState(null);
  const [onFirstPage, setOnFirst] = useState(null);
  const [onLastPage, setOnLast] = useState(null);
  const [page, setPage] = useState(null);
  const [lastPage, setLastPage] = useState(null);
  const [Create, setCreate] = useState(false);
  const [reverse, setReverse] = useState(false);
  const [name, setName] = useState(null);
  const [descr, setDesc] = useState(null);
  const [file, setFile] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    getData(1);
  }, []);

  const getData = async (pagenmr, reverse) => {
    const [list, page, lastPage] = await HomeServer.get(pagenmr, reverse);
    setPage(page);
    setLastPage(lastPage);
    if (reverse) {
      list.reverse();
    }
    setData(list);
    if (page === 1) {
      setOnFirst(true);
    } else {
      setOnFirst(false);
    }
    if (page === lastPage) {
      setOnLast(true);
    } else {
      setOnLast(false);
    }
  };

  const previousPage = () => {
    const prevpage = page - 1;
    getData(prevpage, reverse);
  };

  const nextPage = () => {
    const nextpage = page + 1;
    getData(nextpage, reverse);
  };

  const showCreate = () => {
    setCreate(true);
  };

  const hideCreate = () => {
    setCreate(false);
    setError(false);
  };

  const OldestCards = async (e) => {
    e.preventDefault();
    setReverse(true);
    const reverse = true;
    getData(page, reverse);
  };

  const NewestCards = async (e) => {
    e.preventDefault();
    setReverse(false);
    const reverse = false;
    getData(page, reverse);
  };

  const HandleCreateCard = async (e, name, descr, file) => {
    try {
      e.preventDefault();
      const type = await getRadioVal();
      //const fd = new FormData();
      let fd = new FormData();
      fd.append("file", file, file.name);
      await HomeServer.post(name, type, descr, fd);
      setName(null);
      setDesc(null);
      setFile(null);
      hideCreate();
      getData();
      setError(false);
    } catch (err) {
      setError(true);
    }
  };

  const FileCatcher = async (e) => {
    setFile(e.target.files[0]);
  };

  const getRadioVal = async () => {
    var radioval = "";
    if (document.getElementById("planet").checked) {
      radioval = document.getElementById("planet").value;
    } else if (document.getElementById("star").checked) {
      radioval = document.getElementById("star").value;
    } else if (document.getElementById("moon").checked) {
      radioval = document.getElementById("moon").value;
    } else if (document.getElementById("galaxy").checked) {
      radioval = document.getElementById("galaxy").value;
    }
    return radioval;
  };

  return (
    <>
      <div className="home-main">
        <Container>
          <MainHeader />
          {Create && (
            <>
              <div className="Background" />
              <div className="CreateContainer">
                <form
                  id="createCard"
                  onSubmit={(e) => HandleCreateCard(e, name, descr, file)}
                >
                  <div className="line">
                    <img src="/img/signup.svg" alt="Universe" />
                    <p className="title">
                      Hello, Traveler! Here you can add new astronomical bodies
                      to your card list. Feel free to add as many as you want
                      to. (Use your imagination!)
                    </p>
                  </div>
                  <div className="line name">
                    <p>Name:</p>
                    <input
                      type="name"
                      name="name"
                      placeholder="Earth"
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="line radio">
                    <p>Type:</p>
                    <div className="radios">
                      <input
                        type="radio"
                        id="planet"
                        name="type"
                        value="planet"
                      />
                      <label htmlFor="planet">Planet</label>
                      <input type="radio" id="star" name="type" value="star" />
                      <label htmlFor="male">Star</label>
                      <input type="radio" id="moon" name="type" value="moon" />
                      <label htmlFor="moon">Moon</label>
                      <input
                        type="radio"
                        id="galaxy"
                        name="type"
                        value="galaxy"
                      />
                      <label htmlFor="galaxy">Galaxy</label>
                    </div>
                  </div>
                  <div className="line desc">
                    <p>Description:</p>
                    <textarea
                      form="createCard"
                      name="descr"
                      cols="30"
                      placeholder="Earth is the third planet from the Sun and the only astronomical object known to harbor life. According to radiometric dating estimation and other evidence, Earth formed over 4.5 billion years ago. Earth's gravity interacts with other objects in space..."
                      onChange={(e) => setDesc(e.target.value)}
                    />
                  </div>
                  <div className="line upload">
                    <p>Give us a picture of it! </p>
                    <input
                      type="file"
                      id="picture"
                      name="picture"
                      accept="image/jpg
                      ,image/jpeg"
                      onChange={(e) => FileCatcher(e)}
                    />
                  </div>
                  {error && (
                    <p className="error errorcreate">
                      Oops! Something went wrong!
                    </p>
                  )}
                  <div className="Buttons">
                    <button
                      className="delete"
                      type="button"
                      onClick={(e) => hideCreate()}
                    >
                      CANCEL
                    </button>
                    <button type="submit">CONFIRM</button>
                  </div>
                </form>
              </div>
            </>
          )}
          <div className="list-wrapper">
            <div className="innerheader">
              <p>FILTER:</p>
              {reverse && (
                <Button
                  variant="outline-light"
                  size="sm"
                  onClick={(e) => NewestCards(e)}
                >
                  Date ▼
                </Button>
              )}
              {!reverse && (
                <Button
                  variant="outline-light"
                  size="sm"
                  onClick={(e) => OldestCards(e)}
                >
                  Date ▲
                </Button>
              )}
              <Button
                variant="outline-light"
                size="sm"
                onClick={(e) => showCreate()}
              >
                create new
              </Button>
              <p>
                Page {page} of {lastPage}
              </p>
            </div>
            <div className="list">
              <Row>
                {data &&
                  data.map((item) => (
                    <Card
                      key={item.key}
                      id={item.key}
                      title={item.title}
                      subtitle={item.type}
                    />
                  ))}
              </Row>
            </div>
            <div className="rollpage">
              {onFirstPage && <a className="arrow-left disabled" />}
              {!onFirstPage && (
                <a onClick={(e) => previousPage()} className="arrow-left" />
              )}
              {onLastPage && <a className="arrow-right disabled" />}
              {!onLastPage && (
                <a onClick={(e) => nextPage()} className="arrow-right" />
              )}
            </div>
          </div>

          <Footer />
        </Container>
      </div>
    </>
  );
}
