/**
 * Collects form inputs and submits to database upsert.
 *
 * @function submitForm
 * @memberOf Components:formBuilder:
 * @locus Client
 *
 * @param {Array}   doc - document to submit [ {field: value} ]
 * @param {String}  coll - name of mongoDB collection to store document
 * @param {Boolean} clone - flag to create a clone of the current document
 * @param {Boolean} test - for testing only; does not submit form but does all the checks
 * @param {Boolean} dispatch - parent's dispatch function object
 * @param {Object}  extras - user extra fields
 *
 * @returns nothing - submits doc object to collection
 *
 */


import { Meteor } from 'meteor/meteor';
import {methodReturn} from '../../Functions/utilities/methodReturn'


export async function submitForm(doc, coll, clone, test, emit, extras = {}) {
    //** check if cloning original document, then remove original id field to allow Mongo to complete an insertion
    if (clone) {
        delete doc._id;
        doc.name = `${doc.name}-cloned`;
    }

    //** don't over-write original author in edit mode; create mode needs to add an author
    let me = Meteor.user();

    doc.author = doc.author ? doc.author : (Meteor.userId() ? Meteor.userId() : "unknown");
    doc.authorName = doc.authorName ? doc.authorName : (me && me.username ? me.username : "username");

    // @ts-ignore
    doc.authorFullName = doc.authorFullName ? doc.authorFullName : (me && me.profile && me.profile.name ? me.profile.name : "");

    doc.tenantId = doc.tenantId ? doc.tenantId : extras && extras.tenantId ? extras.tenantId : "general";

    //** provide a case-insensitive form of the name for sorted listing
    doc.sortName = doc.name ? doc.name.toLowerCase() : doc.username ? doc.username.toLowerCase() : "undefined";


    let out = true;

    switch (true) {

        case test:                          //** for testing only
            console.log("submitForm-function", coll, doc._id, doc);

            emit("doc-submitted", true, doc);
            break;

        case coll === "myProfile":
            Meteor.call('userProfileUpdateItem', "profile", doc, function (err, res) {
                methodReturn(err, res, "submit myProfile", null);

                if (res) {
                    emit("doc-submitted", true);
                    emit("method-return", res);
                }
            });
            break;

        case coll === "users":
            if (!doc._id) {
                Meteor.call('userMgmtInsert', doc, function (err, res) {
                    if (res) {
                        emit("doc-submitted", true);
                    }
                    methodReturn(err, res, "", null);
                });
            } else {
                Meteor.call('userMgmtUpdate', doc._id, doc, function (err, res) {
                    if (res) {
                        emit("doc-submitted", true);
                    }
                    methodReturn(err, res, "", null);
                });
            }
            break;

        default:
            //** check if this document includes a reference to an address; get geolocation if true
            if(doc.address){

                console.log("need to update to fetch");
                //let HTTPresult = await HTTP.getPromise(buildRequestUrl(doc.address, "string"));
                //doc = getGeoLocation(doc, HTTPresult);
            }

            generalSubmit(coll, doc, emit);
    }

    return out;
}


function generalSubmit(coll, doc, emit) {

    if (!doc._id) {
        Meteor.call('insertDoc', coll, doc, function (err, res) {
            methodReturn(err, res, "submit insertDoc", null);

            if (res) {
                emit("doc-submitted", true);

                emit("method-return", res);
            }
        });
    } else {

        Meteor.call('updateDoc', coll, doc._id, doc, function (err, res) {
            methodReturn(err, res, "submit updateDoc", null);

            if (res) {
                emit("doc-submitted", true);

                emit("method-return", res);
            }
        });
    }
}




function getGeoLocation(doc, info) {
    //** converts the result from google geocoder into an object that MongoDb can use and adds to field "geoLocation"
    let out = doc;

    if (info && info.statusCode === 200) {
        if (info && info.data && info.data.results[0] && info.data.results[0].geometry && info.data.results[0].geometry.location) {
            let latLng = info.data.results[0].geometry.location;

            if (latLng && typeof latLng === "object") {
                out.geoLocation = {
                    type: "Point",
                    coordinates: [latLng.lng, latLng.lat]
                };
            }
        }
    } else {
        console.warn("http-result-error", info);
    }

    return out;
}


function buildRequestUrl(address, type) {
    //** uses Google maps api to geocode an address string
    let key = Meteor.settings.public.google_maps_api_key;
    let baseUrl = Meteor.settings.public.google_maps_base_uri;
    let url = null;

    if (type === "array") {
        let addr = address.filter(Boolean);     // remove all falsey values from array
        addr = addr.join(", ").trim().replace(/\s+/g, "+");
        url = `${baseUrl}=${addr}&key=${key}`;
    }

    if (type === "string") {
        let addr = address.replace(/\s+/g, " ").trim().replace(/\s+/g, "+");
        url = `${baseUrl}=${addr}&key=${key}`;
    }

    return url;
}
