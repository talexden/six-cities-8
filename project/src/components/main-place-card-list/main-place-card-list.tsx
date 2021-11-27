import MainPlaceCard from '../main-place-card/main-place-card';
import {State} from '../../types/state-type';
import {connect, ConnectedProps} from 'react-redux';
import {nanoid} from 'nanoid';
import {OfferType} from '../../types/offer-type';
import {ThunkAppDispatch} from '../../types/action-type';
import {setSelectedOffer} from '../../store/action';
import {postFavoriteAction} from '../../store/api-actions';

const mapStateToProps = ({sortedCityOffers}: State) => ({
  sortedCityOffers,
});


const mapDispatchToProps = (dispatch: ThunkAppDispatch) => ({
  onSelectOffer(offer: OfferType | null) {
    dispatch(setSelectedOffer(offer));
  },
  onClickFavorite(offer: OfferType) {
    const status = Number(!offer.isFavorite);
    dispatch(postFavoriteAction(offer.id, status));
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

function MainPlaceCardList({sortedCityOffers, onSelectOffer, onClickFavorite}: PropsFromRedux): JSX.Element {

  return (
    <div className="cities__places-list places__list tabs__content">
      {sortedCityOffers.map((offer) => (
        <MainPlaceCard
          offer={offer}
          key={nanoid()}
          onMouseEnter={() => onSelectOffer ? onSelectOffer(offer) : undefined}
          onMouseLeave={() => onSelectOffer ? onSelectOffer(null) : undefined}
          onClickFavorite={() => onClickFavorite(offer)}
        />
      ))}
    </div>
  );
}

export {MainPlaceCardList};

export default connector(MainPlaceCardList);