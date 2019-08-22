/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";
/**
 * Write your transction processor functions here
 */

/**
 * Close the bidding for a vehicle listing and choose the
 * highest bid that is over the asking price
 * @param {com.betweak.carauction.CloseBidding} closeBidding - the closeBidding transaction
 * @transaction
 */
async function closeBidding(closeBidding) {
  // eslint-disable-line no-unused-vars
  const listing = closeBidding.listing;
  if (listing.state !== "FOR_SALE") {
    throw new Error("Listing is not FOR SALE");
  }

  // by default we mark the listing as RESERVE_NOT_MET
  listing.state = "RESERVE_NOT_MET"; // 요청 불가
  let highestOffer = null; // 최고가
  let buyer = null; // 구매자
  let seller = null; // 판매자

  //  offer의 개수가 1이상이면
  if (listing.offers && listing.offers.length > 0) {
    // 정렬
    listing.offers.sort(function(a, b) {
      return b.bidPrice - a.bidPrice;
    });

    // 최고가
    highestOffer = listing.offers[0];
    if (highestOffer.bidPrice >= listing.reservePrice) {
      // 최고가가 예약금 이상이면
      // mark the listing as SOLD
      listing.state = "SOLD";
      buyer = highestOffer.member;
      seller = listing.car.owner;
      // 판매자 잔고 업데이트
      console.log("#### 거래전 판매자 잔고: " + seller.balance);
      seller.balance += highestOffer.bidPrice;
      console.log("#### 거래후 판매자 잔고: " + seller.balance);
      //  구매자 잔고 업데이트
      console.log("#### 거래전 구매자 잔고: " + buyer.balance);
      buyer.balance -= highestOffer.bidPrice;
      console.log("#### 거래후 구매자 잔고: " + buyer.balance);
      // 차의 주인 변경
      listing.car.owner = buyer;
      // 옥션 초기화
      listing.offers = null;
    }
  }

  //   최고가 존재시
  if (highestOffer) {
    // 자동차 정보 변경(주인 변경)
    const carRegistry = await getAssetRegistry("com.betweak.carauction.Car");
    await carRegistry.update(listing.car);
  }

  // 자동차 경매 정보 변경
  const carListingRegistry = await getAssetRegistry(
    "com.betweak.carauction.CarListing"
  );
  await carListingRegistry.update(listing);

  // 자동차 경매 정보가 SOLD이면
  if (listing.state === "SOLD") {
    // 구매자 정보 변경
    const userRegistry = await getParticipantRegistry(
      "com.betweak.carauction.Member"
    );
    // User 정보 업데이트
    await userRegistry.updateAll([buyer, seller]);
  }
}

/**
 * Make an Offer for a carListing
 * @param {com.betweak.carauction.Offer} offer - the offer
 * @transaction
 */
async function makeOffer(offer) {
  // eslint-disable-line no-unused-vars
  let listing = offer.listing;
  if (listing.state !== "FOR_SALE") {
    // 팔리는 중이 아니라면 에러
    throw new Error("Listing is not FOR SALE");
  }
  if (!listing.offers) {
    // 최초 입찰이면 빈 배열 만듬
    listing.offers = [];
  }
  listing.offers.push(offer);

  // save the vehicle listing
  const carListingRegistry = await getAssetRegistry(
    "com.betweak.carauction.CarListing"
  );
  await carListingRegistry.update(listing);
}
