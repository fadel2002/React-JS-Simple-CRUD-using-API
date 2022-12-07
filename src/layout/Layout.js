import { Layout, Menu, message } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined, UserOutlined, LoginOutlined, LogoutOutlined, HomeOutlined, MenuOutlined, FormOutlined, SettingOutlined } from "@ant-design/icons";
import React, { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import logo from "../logo.png";
import FooterC from "../components/Footer";
import Cookies from "js-cookie";
import { MenuKeysContext } from "../provider/MenuKeysProvider";
import SwitchTheme from "../components/SwitchTheme";
import { NavContext } from "../provider/NavProvider";
const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;

const LayoutComp = (props) => {
  const [state, setState] = useState({ collapsed: false });

  const { openKeys, setOpenKeys, onOpenChange } = useContext(MenuKeysContext);

  const { color, setColor, func } = useContext(NavContext);

  let history = useHistory();

  const toHome = () => {
    history.push("/");
  };

  const toggle = () => {
    setState({
      collapsed: !state.collapsed,
    });
  };

  const success = () => {
    message.success("Logout Success");
  };

  const handleLogout = () => {
    if (Cookies.get("token") !== undefined) {
      Cookies.remove("token");
      Cookies.remove("name");
      Cookies.remove("email");
    }
    setColor(1);
    success();
    history.push("/login");
  };

  return (
    <>
      <Layout hasSider>
        <Sider theme={color ? "light" : "dark"} trigger={null} collapsible collapsed={state.collapsed}>
          <img src={logo} className="logo" style={{ backgroundColor: color ? "white" : "#001529" }} />

          <Menu theme={color ? "light" : "dark"} mode="inline" defaultSelectedKeys={["1"]} style={{ position: "sticky", top: "0" }} openKeys={openKeys} onOpenChange={onOpenChange}>
            <SubMenu key="sub1" icon={<HomeOutlined />} title="Home" onTitleClick={toHome}>
              <Menu.Item key="1">
                <a href="#movies-card">Movie Section</a>
              </Menu.Item>
              <Menu.Item key="2">
                <a href="#games-card">Games Section</a>
              </Menu.Item>
            </SubMenu>
            {Cookies.get("token") !== undefined && (
              <SubMenu key="sub4" icon={<MenuOutlined />} title="List">
                <Menu.Item key="6">
                  <Link to="/movies">Movie</Link>
                </Menu.Item>
                <Menu.Item key="7">
                  <Link to="/games">Games</Link>
                </Menu.Item>
              </SubMenu>
            )}
            <SubMenu key="sub2" icon={<UserOutlined />} title="About Me">
              <Menu.Item key="3">
                <Link to="/about">Profile</Link>
              </Menu.Item>
            </SubMenu>
            {Cookies.get("token") === undefined && (
              <SubMenu key="sub3" icon={<LoginOutlined />} title="Auth">
                <Menu.Item key="4">
                  <Link to="/login">Login</Link>
                </Menu.Item>
                <Menu.Item key="5">
                  <Link to="/register">Register</Link>
                </Menu.Item>
              </SubMenu>
            )}
            {Cookies.get("token") !== undefined && (
              <SubMenu key="sub3" icon={<SettingOutlined />} title="Settings">
                <Menu.Item key="8" icon={<FormOutlined />}>
                  <Link to="/change/password">Change Password</Link>
                </Menu.Item>

                <Menu.Item key="9" icon={<LogoutOutlined />}>
                  <Link to="/login" onClick={handleLogout}>
                    Logout
                  </Link>
                </Menu.Item>
              </SubMenu>
            )}
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className={`${color && "site-layout-background-light"}`} style={{ padding: 0 }}>
            {Cookies.get("token") !== undefined && <SwitchTheme />}
            {React.createElement(state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: state.collapsed ? `triggered` : `trigger`,
              onClick: toggle,
              style: { color: color ? "black" : "white" },
            })}
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 600,
            }}
          >
            {props.content}
          </Content>
        </Layout>
      </Layout>
      <FooterC />
    </>
  );
};

export default LayoutComp;
