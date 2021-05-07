import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    height: 150,
    "margin":"4px 6px",
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function OutlinedCard(props) {
  const Datetime = new Date();
  const [selectorone, setselectorone] = useState(false)
  // const [selectortwo, setselectortwo] = useState(false)

  const get_date = (date) => {
    var yyyy = date.getFullYear().toString();
    var mm = (date.getMonth() + 1).toString();
    var dd = date.getDate().toString();
    var mmChars = mm.split("");
    var ddChars = dd.split("");
    return (
      yyyy +
      "-" +
      (mmChars[1] ? mm : "0" + mmChars[0]) +
      "-" +
      (ddChars[1] ? dd : "0" + ddChars[0])
    );
  };
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Card className={classes.root}  variant="outlined">
      <CardContent className="">
        <div className="flex  flex-grow flex-row items-center justify-between">
          <span className="text-md font-bold text-gray-800  mx-3">
            {props.title }
          </span>
          {<span onClick={()=>{setselectorone(!selectorone)}} className="px-4 py-2 text-xs text-indigo-800 uppercase color rounded-xl dark:text-indigo-900">
            <span className={selectorone?"text-white":""}>EUR</span> |<span className={!selectorone?"text-white":""}> DTC</span>
          </span>
          }
        </div>
              <span className="text-xs font-light text-gray-500 font-bold  mx-3 pt-4 ">
                Today {get_date(Datetime)}
              </span>
        <Typography className={classes.pos} color="textSecondary">
              <div className="flex text-center md:mb-5 mx-5 text-2xl">
                {
                  selectorone && 
                <p className="flex-shrink mt-4 text-gray-600">
                  {props.isConnected?"Ξ "+ (props.balance * props.priceEur).toFixed(2)+" EUR":"Connect Metamask to view"}
                </p>
                }
                {
                  !selectorone && 
                <p className="flex-shrink mt-4 text-gray-600 dark:text-gray-300">
                  {props.isConnected?"Ξ "+(props.balance * props.priceEur).toFixed(2)+" DTC":"Connect Metamask to view"}
                </p>
                }
              </div>
        </Typography>
       
      </CardContent>
    </Card>
  );
}
