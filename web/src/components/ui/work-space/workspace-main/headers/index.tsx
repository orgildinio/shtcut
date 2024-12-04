import React from 'react';

const HeadersTitle = ({ step, userValue }: { step: number; userValue: string }) => {
    return (
        <section>
            {userValue === 'team' ? (
                <div>
                    <h1 className="text-xl text-center md:text-2xl ">
                        {step === 1
                            ? 'How do you plan to use Shtcut'
                            : step === 2
                              ? 'Solution you would  like '
                              : step === 3
                                ? 'Invite your team members'
                                : null}
                    </h1>
                    <p className="text-[#433E3F] text-center">
                        {step === 1
                            ? '    To help tailor your shtcut experience'
                            : step === 2
                              ? 'Choose which solution would you like to start with? '
                              : step === 3
                                ? 'To help tailor your shtcut experience'
                                : null}
                    </p>
                    {step === 3 && <p className="mt-6 text-[#0F172A] text-center">Invite team members by email</p>}
                </div>
            ) : (
                <div>
                    <h1 className="text-xl text-center md:text-2xl ">
                        {step === 1 ? 'How do you plan to use Shtcut' : step === 2 ? 'Solution you would  like ' : null}
                    </h1>
                    <p className="text-[#433E3F] text-center">
                        {step === 1
                            ? '    To help tailor your shtcut experience'
                            : step === 2
                              ? 'Choose which solution would you like to start with? '
                              : null}
                    </p>
                    {userValue === 'team' && (
                        <>
                            {' '}
                            {step === 3 && (
                                <p className="mt-6 text-[#0F172A] text-center">Invite team members by email</p>
                            )}
                        </>
                    )}
                </div>
            )}
        </section>
    );
};

export default HeadersTitle;
