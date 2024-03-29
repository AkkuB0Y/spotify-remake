import * as Dialogue from '@radix-ui/react-dialog';
import { IoMdClose } from 'react-icons/io';

interface ModalProps {
    isOpen: boolean;
    onChange: (open: boolean) => void;
    title: string;
    description: string;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
    isOpen,
    onChange,
    title,
    description,
    children
}) => {
    return (
        <Dialogue.Root
            open={isOpen}
            defaultOpen={isOpen}
            onOpenChange={onChange}
        >
            <Dialogue.Portal>
                <Dialogue.Overlay className='bg-neutral-900/90 backdrop-blur-sm fixed inset-0'/>
                <Dialogue.Content className="fixed drop-shadow-md border border-neutral-800 top-[50%] left-[50%] max-h-full h-full md:h-auto md:max-h-[85vh] w-full md:w-[90vw] md:max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-md bg-neutral-800 p-[25px] focus:outline-none">
                    <Dialogue.Title className='text-xl text-center font-bold mb-4'>
                        {title}
                    </Dialogue.Title>
                    <Dialogue.Description className='mb-5 text-sm leading-normal text-center'>
                        {description}
                    </Dialogue.Description>
                    <div>
                        {children}
                    </div>
                    <Dialogue.Close asChild>
                        <button className='text-neutral-400 hover:text-white absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:outline-none'>
                            <IoMdClose />
                        </button>
                    </Dialogue.Close>
                </Dialogue.Content>
            </Dialogue.Portal>
            
        </Dialogue.Root>
    );
}

export default Modal;