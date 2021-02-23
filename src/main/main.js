import axios from "axios";
import React, { useEffect, useState } from "react";
import "./main.scss";
const setBg = () => {
  const randomColor = Math.floor(Math.random() * 16777215).toString(16);
  return "#" + randomColor;
};
export default function Main() {
  const [userData, setUserData] = useState({});
  const [repos, setRepos] = useState([]);
  const [isLoadingUser, setisLoadingUser] = useState(true);
  const [isLoadingRepos, setIsLoadingRepos] = useState(true);
  useEffect(() => {
    axios.get(`https://api.github.com/users/vsanse`).then((resp) => {
      setUserData(resp.data);
      setisLoadingUser(false);
    });
    axios.get(`https://api.github.com/users/vsanse/repos`).then((resp) => {
      setRepos(resp.data);
      setIsLoadingRepos(false);
    });
  }, []);
  return (
    <main>
      <section className="glass">
        <div className="dashboard">
          <div className="user">
            <img src={userData?.avatar_url} alt="" className="shimmer" />
            <h3 className={isLoadingUser ? "line shimmer" : ""}>
              {userData?.name}
            </h3>
            <p className={isLoadingUser ? "line shimmer" : ""}>
              {userData?.bio}
            </p>
            <div className="repo_btns justifyCenter">
              <a
                href={userData?.html_url}
                className={isLoadingUser ? "btn shimmer" : "follow_me"}
              >
                {userData?.html_url && (
                  <i className="fa fa-github" aria-hidden="true"></i>
                )}
              </a>
              <a
                href={userData?.blog}
                className={isLoadingUser ? "btn shimmer" : "follow_me"}
              >
                {userData?.blog && (
                  <i className="fa fa-linkedin" aria-hidden="true"></i>
                )}
              </a>
            </div>
          </div>
          <div className="links"></div>
        </div>
        <div className="repos">
          <div className="status">
            <h1>Repositories</h1>
          </div>
          <div className={`cards ${isLoadingRepos ? "hasShimmer" : ""}`}>
            {!!repos.length ? (
              repos.map((repo) => (
                <div className="card" key={repo?.id}>
                  <div className="avatar_repo" style={{ background: setBg() }}>
                    {repo.name.substring(0, 1)}
                  </div>
                  <div className="card-info">
                    <h2>{repo?.name}</h2>
                    <p className="repo_description">{repo?.description}</p>
                    <div className="repo_btns">
                      <a
                        href={repo?.html_url}
                        className="view_code"
                        target="__blank"
                        title="View Code"
                      >
                        <i className="fa fa-code" aria-hidden="true"></i>
                      </a>
                      {repo?.homepage && (
                        <a
                          href={repo?.homepage}
                          className="view_code"
                          target="__blank"
                          title="View Live"
                        >
                          <i className="fa fa fa-chrome" aria-hidden="true"></i>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="card">
                <div className="avatar_repo shimmer"></div>
                <div className="card-info">
                  <p className="line shimmer" />
                  <p className="line shimmer" />
                  <div className="repo_btns">
                    <p className="btn shimmer" />
                    <p className="btn shimmer" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
