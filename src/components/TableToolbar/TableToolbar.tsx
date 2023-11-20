import { Toolbar, Typography } from "@mui/material";

type TableToolbarType = {
  title: string,
  actions?: JSX.Element
}

function TableToolbar(props: TableToolbarType) {
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
      }}
    >
      <Typography
        sx={{ flex: '1 1 100%' }}
        variant="h6"
        id="tableTitle"
        component="div"
      >
        {props.title}
      </Typography>

      {props.actions && props.actions}
    </Toolbar>
  );
}

export default TableToolbar;