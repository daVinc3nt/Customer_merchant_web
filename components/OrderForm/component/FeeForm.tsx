import React from "react";
import { motion, Variants } from "framer-motion";
import { useIntl } from "react-intl";

const FeeForm = ({
    name_sender,
    phone_number_sender,
    name_receiver,
    phone_number_receiver,
    mass,
    height,
    width,
    length,
    province_source,
    district_source,
    ward_source,
    detail_source,
    province_dest,
    district_dest,
    ward_dest,
    detail_dest,
    COD,
    service_type,
    fee
}) => {
    const intl = useIntl();
    const serviceTypeText = {
        'CPN': intl.formatMessage({ id: 'OrderForm.MoreDetailsForm.typesOfDelivery1' }),
        'TTK': intl.formatMessage({ id: 'OrderForm.MoreDetailsForm.typesOfDelivery3' }),
        'HTT': intl.formatMessage({ id: 'OrderForm.MoreDetailsForm.typesOfDelivery4' }),
        'T60': intl.formatMessage({ id: 'OrderForm.MoreDetailsForm.typesOfDelivery5' })
    };

    const tabContentVariants: Variants = {
        initial: { x: 20, opacity: 0 },
        enter: { x: 0, opacity: 1 },
        exit: { x: -20, opacity: 0 }
    }

    return (
        <div className="relative h-full w-full mt-4 lg:mt-8 border-2 border-formBorder-parent rounded-md">
            <div
                className="bg-formBgColor-firstChild absolute flex flex-col h-full w-full overflow-y-scroll rounded no-scrollbar"
            >
                <motion.h1
                    variants={tabContentVariants}
                    initial="initial"
                    animate="enter"
                    exit="exit"
                    transition={{ duration: 0.5 }}
                    className="mt-2 text-xl sm:text-2xl text-headlineText-default font-bold text-nowrap cursor-default text-center px-4"
                >
                    {intl.formatMessage({ id: "OrderForm.FeeForm.Title" })}
                </motion.h1>

                <motion.div
                    variants={tabContentVariants}
                    initial="initial"
                    animate="enter"
                    exit="exit"
                    transition={{ duration: 0.5 }}
                    className="bg-formBgColor-secondChild flex flex-col items-stretch self-center w-full xs:w-11/12 mb-5 mt-2 bg-transparent xs:rounded-2xl border-y-2 xs:border-2 border-formBorder-children pb-6"
                >

                    <h1 className="mt-4 text-sm font-bold text-headlineText-default text-nowrap cursor-default text-center">
                        {intl.formatMessage({ id: "FeeForm.Fee" })}: <span className="text-green-600">{parseFloat(fee).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
                    </h1>
                    <div className="h-[1.2px] bg-gray-300 my-4"></div>

                    <div className="flex flex-col">
                        <div className="flex flex-col sm:flex-row">
                            <div className="flex gap-2 px-5 py-2">
                                <span className="text-sm font-bold text-headlineText-default whitespace-nowrap">
                                    {intl.formatMessage({ id: "FeeForm.Sender" })}
                                </span>
                                <span className="text-sm text-headlineText-default">{name_sender}</span>
                            </div>
                            <div className="flex gap-2 px-5 py-2">
                                <span className="text-sm font-bold text-headlineText-default whitespace-nowrap">
                                    {intl.formatMessage({ id: "FeeForm.SenderNum" })}
                                </span>
                                <span className="text-sm text-headlineText-default">{phone_number_sender}</span>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row">
                            <div className="flex gap-2 px-5 py-2">
                                <span className="text-sm font-bold text-headlineText-default whitespace-nowrap">
                                    {intl.formatMessage({ id: "FeeForm.Receiver" })}
                                </span>
                                <span className="text-sm text-headlineText-default">{name_receiver}</span>
                            </div>
                            <div className="flex gap-2 px-5 py-2">
                                <span className="text-sm font-bold text-headlineText-default whitespace-nowrap">
                                    {intl.formatMessage({ id: "FeeForm.ReceiverNum" })}
                                </span>
                                <span className="text-sm text-headlineText-default">{phone_number_receiver}</span>
                            </div>
                        </div>


                        <div className="flex gap-2 px-5 py-2">
                            <span className="text-sm font-bold text-headlineText-default whitespace-nowrap">
                                {intl.formatMessage({ id: "FeeForm.PackageDimensions" })}
                            </span>
                            <span className="text-sm text-headlineText-default">{length}cm x {width}cm x {height}cm</span>
                        </div>
                        <div className="flex gap-2 px-5 py-2">
                            <span className="text-sm font-bold text-headlineText-default whitespace-nowrap">
                                {intl.formatMessage({ id: "FeeForm.PackageMass" })}
                            </span>
                            <span className="text-sm text-headlineText-default">{mass}g</span>
                        </div>
                        <div className="flex gap-2 px-5 py-2">
                            <span className="text-sm font-bold text-headlineText-default whitespace-nowrap">
                                {intl.formatMessage({ id: "FeeForm.SourceAddress" })}
                            </span>
                            <span className="text-sm text-headlineText-default">{detail_source}, {ward_source}, {district_source}, {province_source}</span>
                        </div>
                        <div className="flex gap-2 px-5 py-2">
                            <span className="text-sm font-bold text-headlineText-default whitespace-nowrap">
                                {intl.formatMessage({ id: "FeeForm.DestinationAddress" })}
                            </span>
                            <span className="text-sm text-headlineText-default">{detail_dest}, {ward_dest}, {district_dest}, {province_dest}</span>
                        </div>
                        <div className="flex gap-2 px-5 py-2">
                            <span className="text-sm font-bold text-headlineText-default whitespace-nowrap">
                                {intl.formatMessage({ id: "FeeForm.CashOnDelivery" })}
                            </span>
                            <span className="text-sm text-headlineText-default">{parseFloat(COD).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
                        </div>
                        <div className="flex gap-2 px-5 py-2">
                            <span className="text-sm font-bold text-headlineText-default whitespace-nowrap">
                                {intl.formatMessage({ id: "FeeForm.ServiceType" })}
                            </span>
                            <span className="text-sm text-headlineText-default">{serviceTypeText[service_type]}</span>
                        </div>
                    </div>


                </motion.div>
            </div>
        </div>
    );
};

export default FeeForm;
