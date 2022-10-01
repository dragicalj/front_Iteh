import { Avatar, Box, Card, CardContent, Grid, Typography } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { ArrowDownward } from '@mui/icons-material';
import PeopleIcon from '@mui/icons-material/PeopleOutlined';

const TotalUsers = (props) => (
  <Card {...props}>
    <CardContent>
      <Grid
        container
        spacing={3}
        sx={{ justifyContent: 'space-between' }}
      >
        <Grid item>
          <Typography
            color="textSecondary"
            gutterBottom
            variant="overline"
          >
            TOTAL USERS
          </Typography>
          <Typography
            color="textPrimary"
            variant="h4"
          >
            {props.userCount}
          </Typography>
        </Grid>
        <Grid item>
          <Avatar
            sx={{
              backgroundColor: 'success.main',
              height: 56,
              width: 56
            }}
          >
            <PeopleIcon />
          </Avatar>
        </Grid>
      </Grid>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          pt: 2
        }}
      >
            {!props.increase.includes("-") && (
               <ArrowUpwardIcon  color="success"/>
            )}
          {props.increase.includes("-") && (
               <ArrowDownward sx={{ color : "red" }}/>
            )}
        <Typography
          variant="body2"
          sx={{
            mr: 1
          }}
        >
          {props.increase}%
        </Typography>
        <Typography
          color="textSecondary"
          variant="caption"
        >
          Since last month
        </Typography>
      </Box>
    </CardContent>
  </Card>
);
export default TotalUsers;
