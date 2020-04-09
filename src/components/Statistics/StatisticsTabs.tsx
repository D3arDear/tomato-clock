import React from "react";
import { makeStyles, withStyles, Theme, createStyles } from "@material-ui/core/styles";
import SwipeableViews from "react-swipeable-views";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { Typography, Box, useTheme } from "@material-ui/core";

interface StyledTabProps {
  label: string;
}

const AntTabs = withStyles({
  root: {
    borderBottom: "1px solid #e8e8e8",
  },
  indicator: {
    backgroundColor: "rgba(255, 179, 113, 1)",
  },
})(Tabs);

const AntTab = withStyles((theme: Theme) =>
  createStyles({
    root: {
      textTransform: "none",
      minWidth: 72,
      fontWeight: theme.typography.fontWeightRegular,
      marginRight: theme.spacing(4),
      transition: "color 0.2s",
      fontFamily: [
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(","),
      "&:hover": {
        color: "rgba(255, 225, 143, 1)",
        opacity: 1,
      },
      "&$selected": {
        color: "rgba(255, 179, 113, 1)",
        fontWeight: theme.typography.fontWeightMedium,
      },
      "&:focus": {
        color: "rgba(255, 179, 113, 1)",
      },
    },
    selected: {},
  }),
)((props: StyledTabProps) => <Tab disableRipple {...props} />);

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
  },
  padding: {
    padding: theme.spacing(3),
  },
  wrapper: {
    backgroundColor: theme.palette.background.paper,
  },
  pannel: {
    padding: 0,
  },
}));

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box css={{ padding: "12px 0" }} p={3}>
          {children}
        </Box>
      )}
    </Typography>
  );
}

const StatisticsTabs: React.FunctionComponent<any> = (props) => {
  const classes = useStyles();
  const theme = useTheme();

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };
  const handleChangeIndex = (index: number) => {
    setValue(index);
  };
  return (
    <div className={classes.root}>
      <div className={classes.wrapper}>
        <AntTabs value={value} onChange={handleChange} textColor="secondary" aria-label="ant example">
          <AntTab label="已完成任务" />
          <AntTab label="已删除任务" />
        </AntTabs>
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
            {props.children && props.children[0]}
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            {props.children && props.children[1]}
          </TabPanel>
        </SwipeableViews>
      </div>
    </div>
  );
};

export default StatisticsTabs;