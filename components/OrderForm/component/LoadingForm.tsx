import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FormattedMessage, useIntl } from "react-intl";

const Loading = ({ currentForm }) => {
    const intl = useIntl();
    const [letters, setLetters] = useState([]);

    useEffect(() => {
        const message = currentForm === 2 ? "OrderForm.Loading" : "OrderForm.Creating";
        const chars = intl.formatMessage({ id: message }).split('');
        setLetters(chars);
    }, [currentForm, intl]);

    return (
        <div className="relative h-full w-full mt-4 lg:mt-8 border-2 border-formBorder-parent rounded-md">
            <div className="bg-formBgColor-firstChild absolute flex justify-center place-items-center h-full w-full overflow-y-scroll rounded no-scrollbar">
                {letters.map((letter, index) => (
                    <motion.span
                        key={index}
                        style={{
                            display: "inline-block",
                            originY: 0.5,
                            marginRight: letter === " " ? "0.5em" : "0.05em" // Adjust spacing based on whether the character is a space or not
                        }}
                        animate={{ y: [5, 0, 0] }}
                        transition={{
                            duration: .8,
                            repeat: Infinity,
                            repeatType: "reverse",
                            delay: index * 0.1
                        }}
                    >
                        {letter}
                    </motion.span>
                ))}
            </div>
        </div>
    );
};

export default Loading;
