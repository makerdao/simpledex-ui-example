import { useState, useEffect } from 'react';
import useMaker from '../hooks/useMaker';
import {  Text, Grid, Box, Container, Input, Button } from 'theme-ui';

const makerOtcSupportMethodsAddr = '0x85dc0e1e8dfeff03e56dc9de2da615d0de77a886';
const makerOtcSupportMethodsAbi = [{"constant":true,"inputs":[{"internalType":"address","name":"otc","type":"address"},{"internalType":"address","name":"payToken","type":"address"},{"internalType":"address","name":"buyToken","type":"address"}],"name":"getOffers","outputs":[{"internalType":"uint256[100]","name":"ids","type":"uint256[100]"},{"internalType":"uint256[100]","name":"payAmts","type":"uint256[100]"},{"internalType":"uint256[100]","name":"buyAmts","type":"uint256[100]"},{"internalType":"address[100]","name":"owners","type":"address[100]"},{"internalType":"uint256[100]","name":"timestamps","type":"uint256[100]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"otc","type":"address"},{"internalType":"uint256","name":"offerId_","type":"uint256"}],"name":"getOffers","outputs":[{"internalType":"uint256[100]","name":"ids","type":"uint256[100]"},{"internalType":"uint256[100]","name":"payAmts","type":"uint256[100]"},{"internalType":"uint256[100]","name":"buyAmts","type":"uint256[100]"},{"internalType":"address[100]","name":"owners","type":"address[100]"},{"internalType":"uint256[100]","name":"timestamps","type":"uint256[100]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"otc","type":"address"},{"internalType":"address","name":"buyToken","type":"address"},{"internalType":"uint256","name":"buyAmt","type":"uint256"},{"internalType":"address","name":"payToken","type":"address"}],"name":"getOffersAmountToBuyAll","outputs":[{"internalType":"uint256","name":"ordersToTake","type":"uint256"},{"internalType":"bool","name":"takesPartialOrder","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"otc","type":"address"},{"internalType":"address","name":"payToken","type":"address"},{"internalType":"uint256","name":"payAmt","type":"uint256"},{"internalType":"address","name":"buyToken","type":"address"}],"name":"getOffersAmountToSellAll","outputs":[{"internalType":"uint256","name":"ordersToTake","type":"uint256"},{"internalType":"bool","name":"takesPartialOrder","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"}];
const matchingMarketAddr = '0xe325acB9765b02b8b418199bf9650972299235F4';
const matchingMarketAbi = [{"inputs":[{"internalType":"uint64","name":"close_time","type":"uint64"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"id","type":"bytes32"},{"indexed":true,"internalType":"bytes32","name":"pair","type":"bytes32"},{"indexed":true,"internalType":"address","name":"maker","type":"address"},{"indexed":false,"internalType":"contract ERC20","name":"pay_gem","type":"address"},{"indexed":false,"internalType":"contract ERC20","name":"buy_gem","type":"address"},{"indexed":false,"internalType":"uint128","name":"pay_amt","type":"uint128"},{"indexed":false,"internalType":"uint128","name":"buy_amt","type":"uint128"},{"indexed":false,"internalType":"uint64","name":"timestamp","type":"uint64"}],"name":"LogBump","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"bool","name":"isEnabled","type":"bool"}],"name":"LogBuyEnabled","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"keeper","type":"address"},{"indexed":false,"internalType":"uint256","name":"id","type":"uint256"}],"name":"LogDelete","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"keeper","type":"address"},{"indexed":false,"internalType":"uint256","name":"id","type":"uint256"}],"name":"LogInsert","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"id","type":"uint256"}],"name":"LogItemUpdate","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"id","type":"bytes32"},{"indexed":true,"internalType":"bytes32","name":"pair","type":"bytes32"},{"indexed":true,"internalType":"address","name":"maker","type":"address"},{"indexed":false,"internalType":"contract ERC20","name":"pay_gem","type":"address"},{"indexed":false,"internalType":"contract ERC20","name":"buy_gem","type":"address"},{"indexed":false,"internalType":"uint128","name":"pay_amt","type":"uint128"},{"indexed":false,"internalType":"uint128","name":"buy_amt","type":"uint128"},{"indexed":false,"internalType":"uint64","name":"timestamp","type":"uint64"}],"name":"LogKill","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"id","type":"bytes32"},{"indexed":true,"internalType":"bytes32","name":"pair","type":"bytes32"},{"indexed":true,"internalType":"address","name":"maker","type":"address"},{"indexed":false,"internalType":"contract ERC20","name":"pay_gem","type":"address"},{"indexed":false,"internalType":"contract ERC20","name":"buy_gem","type":"address"},{"indexed":false,"internalType":"uint128","name":"pay_amt","type":"uint128"},{"indexed":false,"internalType":"uint128","name":"buy_amt","type":"uint128"},{"indexed":false,"internalType":"uint64","name":"timestamp","type":"uint64"}],"name":"LogMake","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"bool","name":"isEnabled","type":"bool"}],"name":"LogMatchingEnabled","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"pay_gem","type":"address"},{"indexed":false,"internalType":"uint256","name":"min_amount","type":"uint256"}],"name":"LogMinSell","type":"event"},{"anonymous":true,"inputs":[{"indexed":true,"internalType":"bytes4","name":"sig","type":"bytes4"},{"indexed":true,"internalType":"address","name":"guy","type":"address"},{"indexed":true,"internalType":"bytes32","name":"foo","type":"bytes32"},{"indexed":true,"internalType":"bytes32","name":"bar","type":"bytes32"},{"indexed":false,"internalType":"uint256","name":"wad","type":"uint256"},{"indexed":false,"internalType":"bytes","name":"fax","type":"bytes"}],"name":"LogNote","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"authority","type":"address"}],"name":"LogSetAuthority","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"}],"name":"LogSetOwner","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"id","type":"uint256"}],"name":"LogSortedOffer","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"bytes32","name":"id","type":"bytes32"},{"indexed":true,"internalType":"bytes32","name":"pair","type":"bytes32"},{"indexed":true,"internalType":"address","name":"maker","type":"address"},{"indexed":false,"internalType":"contract ERC20","name":"pay_gem","type":"address"},{"indexed":false,"internalType":"contract ERC20","name":"buy_gem","type":"address"},{"indexed":true,"internalType":"address","name":"taker","type":"address"},{"indexed":false,"internalType":"uint128","name":"take_amt","type":"uint128"},{"indexed":false,"internalType":"uint128","name":"give_amt","type":"uint128"},{"indexed":false,"internalType":"uint64","name":"timestamp","type":"uint64"}],"name":"LogTake","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"pay_amt","type":"uint256"},{"indexed":true,"internalType":"address","name":"pay_gem","type":"address"},{"indexed":false,"internalType":"uint256","name":"buy_amt","type":"uint256"},{"indexed":true,"internalType":"address","name":"buy_gem","type":"address"}],"name":"LogTrade","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"id","type":"uint256"}],"name":"LogUnsortedOffer","type":"event"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"_best","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"_dust","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"_near","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"_rank","outputs":[{"internalType":"uint256","name":"next","type":"uint256"},{"internalType":"uint256","name":"prev","type":"uint256"},{"internalType":"uint256","name":"delb","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"_span","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"authority","outputs":[{"internalType":"contract DSAuthority","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"bytes32","name":"id_","type":"bytes32"}],"name":"bump","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"buy","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"contract ERC20","name":"buy_gem","type":"address"},{"internalType":"uint256","name":"buy_amt","type":"uint256"},{"internalType":"contract ERC20","name":"pay_gem","type":"address"},{"internalType":"uint256","name":"max_fill_amount","type":"uint256"}],"name":"buyAllAmount","outputs":[{"internalType":"uint256","name":"fill_amt","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"buyEnabled","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"id","type":"uint256"}],"name":"cancel","outputs":[{"internalType":"bool","name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"close_time","outputs":[{"internalType":"uint64","name":"","type":"uint64"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"id","type":"uint256"}],"name":"del_rank","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"dustId","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"contract ERC20","name":"sell_gem","type":"address"},{"internalType":"contract ERC20","name":"buy_gem","type":"address"}],"name":"getBestOffer","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"id","type":"uint256"}],"name":"getBetterOffer","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"contract ERC20","name":"buy_gem","type":"address"},{"internalType":"contract ERC20","name":"pay_gem","type":"address"},{"internalType":"uint256","name":"pay_amt","type":"uint256"}],"name":"getBuyAmount","outputs":[{"internalType":"uint256","name":"fill_amt","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getFirstUnsortedOffer","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"contract ERC20","name":"pay_gem","type":"address"}],"name":"getMinSell","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"id","type":"uint256"}],"name":"getNextUnsortedOffer","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"id","type":"uint256"}],"name":"getOffer","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"contract ERC20","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"contract ERC20","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"contract ERC20","name":"sell_gem","type":"address"},{"internalType":"contract ERC20","name":"buy_gem","type":"address"}],"name":"getOfferCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"id","type":"uint256"}],"name":"getOwner","outputs":[{"internalType":"address","name":"owner","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"contract ERC20","name":"pay_gem","type":"address"},{"internalType":"contract ERC20","name":"buy_gem","type":"address"},{"internalType":"uint256","name":"buy_amt","type":"uint256"}],"name":"getPayAmount","outputs":[{"internalType":"uint256","name":"fill_amt","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getTime","outputs":[{"internalType":"uint64","name":"","type":"uint64"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"id","type":"uint256"}],"name":"getWorseOffer","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"uint256","name":"pos","type":"uint256"}],"name":"insert","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"id","type":"uint256"}],"name":"isActive","outputs":[{"internalType":"bool","name":"active","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"isClosed","outputs":[{"internalType":"bool","name":"closed","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"id","type":"uint256"}],"name":"isOfferSorted","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"bytes32","name":"id","type":"bytes32"}],"name":"kill","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"last_offer_id","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"contract ERC20","name":"pay_gem","type":"address"},{"internalType":"contract ERC20","name":"buy_gem","type":"address"},{"internalType":"uint128","name":"pay_amt","type":"uint128"},{"internalType":"uint128","name":"buy_amt","type":"uint128"}],"name":"make","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"matchingEnabled","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"pay_amt","type":"uint256"},{"internalType":"contract ERC20","name":"pay_gem","type":"address"},{"internalType":"uint256","name":"buy_amt","type":"uint256"},{"internalType":"contract ERC20","name":"buy_gem","type":"address"},{"internalType":"uint256","name":"pos","type":"uint256"}],"name":"offer","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"pay_amt","type":"uint256"},{"internalType":"contract ERC20","name":"pay_gem","type":"address"},{"internalType":"uint256","name":"buy_amt","type":"uint256"},{"internalType":"contract ERC20","name":"buy_gem","type":"address"},{"internalType":"uint256","name":"pos","type":"uint256"},{"internalType":"bool","name":"rounding","type":"bool"}],"name":"offer","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"pay_amt","type":"uint256"},{"internalType":"contract ERC20","name":"pay_gem","type":"address"},{"internalType":"uint256","name":"buy_amt","type":"uint256"},{"internalType":"contract ERC20","name":"buy_gem","type":"address"}],"name":"offer","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"offers","outputs":[{"internalType":"uint256","name":"pay_amt","type":"uint256"},{"internalType":"contract ERC20","name":"pay_gem","type":"address"},{"internalType":"uint256","name":"buy_amt","type":"uint256"},{"internalType":"contract ERC20","name":"buy_gem","type":"address"},{"internalType":"address","name":"owner","type":"address"},{"internalType":"uint64","name":"timestamp","type":"uint64"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"contract ERC20","name":"pay_gem","type":"address"},{"internalType":"uint256","name":"pay_amt","type":"uint256"},{"internalType":"contract ERC20","name":"buy_gem","type":"address"},{"internalType":"uint256","name":"min_fill_amount","type":"uint256"}],"name":"sellAllAmount","outputs":[{"internalType":"uint256","name":"fill_amt","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"contract DSAuthority","name":"authority_","type":"address"}],"name":"setAuthority","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"bool","name":"buyEnabled_","type":"bool"}],"name":"setBuyEnabled","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"bool","name":"matchingEnabled_","type":"bool"}],"name":"setMatchingEnabled","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"contract ERC20","name":"pay_gem","type":"address"},{"internalType":"uint256","name":"dust","type":"uint256"}],"name":"setMinSell","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"owner_","type":"address"}],"name":"setOwner","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"stop","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"stopped","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"bytes32","name":"id","type":"bytes32"},{"internalType":"uint128","name":"maxTakeAmount","type":"uint128"}],"name":"take","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}];

const valNum = (num) => {
  const n = Number(num);
  return !(Number.isNaN(n) || !Number.isFinite(n) || n===0);
};

const Orders = (props) => {
  const { maker, web3Connected } = useMaker();
  const [orders, setOrders] = useState([]);
  const [payAmnt, setPayAmnt] = useState(null);
  const [getAmnt, setGetAmnt] = useState(null);
  const [ethPrice, setEthPrice] = useState(null);

  useEffect(() => {
    const listOrders = async () => {
      const supportMethods =  maker.service('web3').web3Contract(makerOtcSupportMethodsAbi,makerOtcSupportMethodsAddr);
      const offers = await supportMethods.methods.getOffers(matchingMarketAddr,props.get,props.give).call();
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

  useEffect( () => {
    setEthPrice(payAmnt/getAmnt);
  }, [payAmnt,getAmnt]);


  const postBid = () => {
    const matchingMarketContract =  maker.service('web3').web3Contract(matchingMarketAbi,matchingMarketAddr);
    const toBN = maker.service('web3')._web3.utils.toBN;

    matchingMarketContract.methods.offer(
      toBN(payAmnt*1E9).mul(toBN(1E9)),
      props.give,
      toBN(getAmnt*1E9).mul(toBN(1E9)),
      props.get,
      0,
      true).send({from:maker.currentAddress()});
  };

  const takeBid = (id,amount) => {
    const matchingMarketContract =  maker.service('web3').web3Contract(matchingMarketAbi,matchingMarketAddr);
    matchingMarketContract.methods.buy(
      id,
      maker.service('web3')._web3.utils.toBN(amount),
      ).send({from:maker.currentAddress()});
  };

  return (
    <Container>
    { web3Connected && (
    <div>
      <Grid
        columns={4}
        sx={{
          borderBottom: '1px solid',
          borderTop: '1px solid',
          borderColor: 'muted',
          px: 2,
          py: 1
        }}
      >
        {['Pay '+props.giveLabel, 'Get '+props.getLabel, 'Price Dai', 'Action'].map((h, key) => (
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
            <Grid columns={4} key={key}>
              <Text>{row.buyAmts/1E18}</Text>
              <Text>{row.payAmts/1E18}</Text>
              <Text>{row.buyAmts/row.payAmts}</Text>
              <Button sx={{ width: 5, lineHeight:1, p:0, m: 1 }} onClick={() => {takeBid(row.id,row.payAmts);}}>Take</Button>
            </Grid>
          ))}
        <p/>
      </Box>
      <Box width={100}>
        <div>
          <Grid columns={2}>
            Pay in {props.giveLabel}
            <Input placeholder="Pay Amount" value={payAmnt} sx={{ width: 6 }} onChange={e => setPayAmnt(e.target.value)}/>
          </Grid>
          <Grid columns={2}>
            Get in {props.getLabel}
            <Input placeholder="Get Amount" value={getAmnt} sx={{ width: 6 }} onChange={e => setGetAmnt(e.target.value)}/>
          </Grid>
          <Grid columns={2}>
            <div>ETHDAI Price</div>
            <div>{ethPrice}</div>
          </Grid>
          <Button sx={{ width: 6 , mr: 0, lineHeight:1, p:0, mb: 1 }} onClick={() => {postBid();}}>Place Order</Button>
        </div>
      </Box>
    </div>
    )}
    </Container>
  );
};
export default Orders;
