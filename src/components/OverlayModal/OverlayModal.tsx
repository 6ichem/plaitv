import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {} from "@headlessui/react";
import Icon from "../Icon";
import styles from "./OverlayModal.module.scss";

type DialogParameters = Parameters<typeof Dialog>[0];

type propTypes = DialogParameters & {
  title: string;
  children: JSX.Element;
};

export default function OverlayModal({
  title,
  children,
  open,
  ...rest
}: propTypes) {
  return (
    <Transition show={open} appear as={Fragment}>
      <Dialog as="div" className={styles.Modal} {...rest}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className={styles.Modal__Overlay} />
        </Transition.Child>

        <div className={styles.Modal__Inner}>
          <div className={styles.Modal__InnerContent}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className={styles.Modal__InnerPanel}>
                <div className={styles.Modal__Close}>
                  <button onClick={() => rest.onClose(false)}>
                    <Icon name="close" />
                  </button>
                </div>
                <div className={styles.Modal__InnerLayout}>
                  <Dialog.Title as="h1">{title}</Dialog.Title>
                  <div>{children}</div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
