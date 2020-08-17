import { useState, useEffect } from 'react';
import useMaker from '../hooks/useMaker';
import {  Text, Grid, Box, Container } from 'theme-ui';

const MakerOtcSupportMethods = '0x85dc0e1e8dfeff03e56dc9de2da615d0de77a886';
const abi = [{"constant":true,"inputs":[{"internalType":"address","name":"otc","type":"address"},{"internalType":"address","name":"payToken","type":"address"},{"internalType":"address","name":"buyToken","type":"address"}],"name":"getOffers","outputs":[{"internalType":"uint256[100]","name":"ids","type":"uint256[100]"},{"internalType":"uint256[100]","name":"payAmts","type":"uint256[100]"},{"internalType":"uint256[100]","name":"buyAmts","type":"uint256[100]"},{"internalType":"address[100]","name":"owners","type":"address[100]"},{"internalType":"uint256[100]","name":"timestamps","type":"uint256[100]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"otc","type":"address"},{"internalType":"uint256","name":"offerId_","type":"uint256"}],"name":"getOffers","outputs":[{"internalType":"uint256[100]","name":"ids","type":"uint256[100]"},{"internalType":"uint256[100]","name":"payAmts","type":"uint256[100]"},{"internalType":"uint256[100]","name":"buyAmts","type":"uint256[100]"},{"internalType":"address[100]","name":"owners","type":"address[100]"},{"internalType":"uint256[100]","name":"timestamps","type":"uint256[100]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"otc","type":"address"},{"internalType":"address","name":"buyToken","type":"address"},{"internalType":"uint256","name":"buyAmt","type":"uint256"},{"internalType":"address","name":"payToken","type":"address"}],"name":"getOffersAmountToBuyAll","outputs":[{"internalType":"uint256","name":"ordersToTake","type":"uint256"},{"internalType":"bool","name":"takesPartialOrder","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"otc","type":"address"},{"internalType":"address","name":"payToken","type":"address"},{"internalType":"uint256","name":"payAmt","type":"uint256"},{"internalType":"address","name":"buyToken","type":"address"}],"name":"getOffersAmountToSellAll","outputs":[{"internalType":"uint256","name":"ordersToTake","type":"uint256"},{"internalType":"bool","name":"takesPartialOrder","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"}];
const MatchingMarket = '0xe325acB9765b02b8b418199bf9650972299235F4';

const Orders = (props) => {
  const { maker, web3Connected } = useMaker();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const listOrders = async () => {
      const supportMethods =  maker.service('web3').web3Contract(abi,MakerOtcSupportMethods);
      const offers = await supportMethods.methods.getOffers(MatchingMarket,props.give,props.get).call();
      const tableOffers = offers.ids.map( (v, i) => ( {id:v, payAmts: offers.payAmts[i], buyAmts:offers.buyAmts[i]} ) )
        .filter(v=>(v.id!=='0'));
      setOrders(tableOffers);
    };
    if (web3Connected) {
      listOrders();
    }

    const interval = setInterval(() => {
      if (web3Connected) {
        listOrders();
      }
    }, 4000);
    return () => clearInterval(interval);

  },[maker,web3Connected]);

  return (
    <Container>
    { web3Connected && (
    <div>
      <Grid
        columns={3}
        sx={{
          borderBottom: '1px solid',
          borderTop: '1px solid',
          borderColor: 'muted',
          px: 2,
          py: 1
        }}
      >
        {['Thead1', 'Thead2', 'Price'].map((h, key) => (
          <Text sx={{ fontWeight: 'bold' }} key={key}>
            {h}
          </Text>
        ))}
      </Grid>
      <Box
        sx={{
          maxHeight: '200px',
          overflow: 'auto',
          borderBottom: '1px solid',
          borderColor: 'muted',
          px: 2,
          py: 1,
          '&::-webkit-scrollbar': {
            width: '5px',
            minWidth: '5px'
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: 'foreground',
            borderRadius: 'small'
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'muted',
            borderRadius: 'small'
          }
        }}
      >

        {orders
          .map((row,key) => (
            <Grid columns={3} key={key}>
              <Text>{row.buyAmts/1E18}</Text>
              <Text>{row.payAmts/1E18}</Text>
              <Text>{row.buyAmts/row.payAmts}</Text>
            </Grid>
          ))}
      </Box>
    </div>
    )}
    </Container>
  );

};
export default Orders;
